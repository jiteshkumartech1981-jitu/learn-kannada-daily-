// ============================================================
// AUDIO ENGINE v4 — BULLETPROOF
// Multiple fallback layers for TTS + text-input scoring for mic
// ============================================================

// ─── TTS: TEXT TO SPEECH ────────────────────────────────────────────────────

let _voiceCache = null;
let _voiceLoadAttempted = false;

// Force-load voices synchronously + async fallback
const ensureVoices = () => {
  if (_voiceCache && _voiceCache.length > 0) return _voiceCache;
  
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  
  const v = window.speechSynthesis.getVoices();
  if (v.length > 0) {
    _voiceCache = v;
    return v;
  }
  return [];
};

// Attach voiceschanged listener immediately
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    _voiceCache = window.speechSynthesis.getVoices();
    _voiceLoadAttempted = true;
  };
  // Also try sync load
  ensureVoices();
}

const pickVoice = (voices) => {
  if (!voices || voices.length === 0) return null;
  return (
    voices.find(v => v.lang === 'kn-IN') ||
    voices.find(v => v.lang.startsWith('kn')) ||
    voices.find(v => v.lang === 'hi-IN') ||
    voices.find(v => v.lang === 'en-IN') ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  );
};

// Main speak function with multiple retries
export const playKannadaTTS = (text, rate = 1.3, onEnd = null) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  const synth = window.speechSynthesis;

  // Cancel previous
  synth.cancel();

  const doSpeak = () => {
    const voices = ensureVoices();
    const voice = pickVoice(voices);

    const utter = new SpeechSynthesisUtterance(text.trim());
    utter.rate = rate;
    utter.pitch = 1.1;
    utter.volume = 1.0;
    
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    } else {
      // No voice found — use default lang, browser will use its default voice
      utter.lang = 'en-IN';
    }

    utter.onend = () => { if (onEnd) onEnd(); };
    utter.onerror = (e) => {
      console.warn('TTS error:', e);
      if (onEnd) onEnd();
    };

    // Fix Chromium pause bug
    if (synth.paused) synth.resume();
    
    synth.speak(utter);

    // Chromium long-utterance bug: periodically pause/resume
    const keepAlive = setInterval(() => {
      if (!synth.speaking) { clearInterval(keepAlive); return; }
      synth.pause();
      synth.resume();
    }, 8000);

    utter.onend = () => {
      clearInterval(keepAlive);
      if (onEnd) onEnd();
    };
  };

  // Try immediately
  const immediateVoices = synth.getVoices();
  if (immediateVoices.length > 0) {
    _voiceCache = immediateVoices;
    doSpeak();
  } else {
    // Voices not ready — wait up to 1.5s for voiceschanged, then speak anyway
    const timer = setTimeout(() => {
      doSpeak(); // speak with whatever voice is available (even default)
    }, 1500);

    const handler = () => {
      clearTimeout(timer);
      _voiceCache = synth.getVoices();
      synth.removeEventListener('voiceschanged', handler);
      doSpeak();
    };
    synth.addEventListener('voiceschanged', handler);
  }
};

// Get diagnostic info about available voices (for debug display)
export const getVoiceDiagnostics = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return { supported: false, voiceCount: 0, voices: [], bestVoice: null };
  }
  const voices = window.speechSynthesis.getVoices();
  const best = pickVoice(voices);
  return {
    supported: true,
    voiceCount: voices.length,
    voices: voices.map(v => `${v.name} (${v.lang})`).slice(0, 10),
    bestVoice: best ? `${best.name} (${best.lang})` : 'Default (none loaded yet)',
  };
};

// ─── PRONUNCIATION SCORING ──────────────────────────────────────────────────

// Score user's typed attempt against the target phrase
export const scoreTypedAttempt = (userTyped, targetKannada, targetPhonetic, targetKeywords = []) => {
  if (!userTyped || !userTyped.trim()) return { score: 0, feedback: 'Please type your attempt.' };

  const input = userTyped.trim().toLowerCase();
  const targetPh = targetPhonetic.toLowerCase();
  const targetKn = targetKannada.toLowerCase();

  // Exact match with Kannada script
  if (input === targetKn) {
    return { score: 100, feedback: 'ಅದ್ಭುತ! Perfect Kannada script match! You typed it exactly right!' };
  }

  // Exact match with phonetic
  if (input === targetPh) {
    return { score: 98, feedback: 'Excellent! Your phonetic spelling is spot on!' };
  }

  // Check keyword matches
  let keywordHits = 0;
  const allKeywords = [...targetKeywords, ...targetPh.split(/[\s,.-]+/)].filter(k => k.length > 2);

  for (const kw of allKeywords) {
    if (input.includes(kw.toLowerCase())) keywordHits++;
  }

  if (allKeywords.length > 0 && keywordHits > 0) {
    const ratio = keywordHits / allKeywords.length;
    if (ratio >= 0.8) return { score: 92, feedback: 'Great job! Most keywords matched perfectly.' };
    if (ratio >= 0.5) return { score: 75, feedback: 'Good! You got the main words right. Check the smaller connecting words.' };
    if (ratio >= 0.2) return { score: 55, feedback: 'Partial match. Listen to the audio again and compare with the phonetic guide.' };
  }

  // Check if any Kannada characters are present
  const hasKannada = /[\u0C80-\u0CFF]/.test(input);
  if (hasKannada) {
    // Partial Kannada match
    const targetChars = [...targetKn];
    let matchCount = 0;
    for (const ch of [...input]) {
      if (targetChars.includes(ch)) matchCount++;
    }
    const charRatio = matchCount / Math.max(targetChars.length, 1);
    const score = Math.round(40 + charRatio * 55);
    return { score: Math.min(95, score), feedback: score >= 70 ? 'Good Kannada typing! Keep practicing.' : 'Some characters match. Compare letter by letter.' };
  }

  // Fuzzy phonetic comparison
  const inputWords = input.split(/\s+/);
  const targetWords = targetPh.split(/\s+/);
  let wordHits = 0;
  for (const tw of targetWords) {
    for (const iw of inputWords) {
      if (tw.includes(iw) || iw.includes(tw)) { wordHits++; break; }
    }
  }

  if (wordHits > 0) {
    const score = Math.round(40 + (wordHits / targetWords.length) * 50);
    return { score: Math.min(90, score), feedback: score >= 70 ? 'Nice phonetic attempt!' : 'Some words match. Review the phonetic guide above.' };
  }

  return { score: 25, feedback: 'Keep trying! Listen to the audio and copy the phonetic text exactly.' };
};

// Score based on recorded audio duration (for MediaRecorder mic)
export const scorePronunciationByDuration = (durationMs, targetTextLength) => {
  const expected = Math.max(800, targetTextLength * 70);
  const ratio = durationMs / expected;

  if (ratio >= 0.6 && ratio <= 3.0) return Math.round(75 + Math.random() * 20);
  if (ratio >= 0.3) return Math.round(50 + Math.random() * 20);
  return Math.round(25 + Math.random() * 25);
};

// ─── MIC RECORDING (Local MediaRecorder) ────────────────────────────────────

export const isMicSupported = () => {
  return typeof window !== 'undefined' &&
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export const createLocalMicRecorder = async ({ onStart, onStop, onError }) => {
  if (!isMicSupported()) {
    if (onError) onError('mic_not_supported', 'Browser does not support microphone access.');
    return null;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    if (onError) {
      if (err.name === 'NotAllowedError') {
        onError('not_allowed', 'Microphone permission denied. Click the lock icon in address bar → Allow Mic → Refresh.');
      } else {
        onError('mic_error', err.message || 'Could not access microphone.');
      }
    }
    return null;
  }

  const chunks = [];
  let startMs = 0;
  const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
  const recorder = new MediaRecorder(stream, { mimeType });

  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
  recorder.onstart = () => { startMs = Date.now(); if (onStart) onStart(stream); };
  recorder.onstop = () => {
    const dur = Date.now() - startMs;
    const blob = new Blob(chunks, { type: mimeType });
    stream.getTracks().forEach(t => t.stop());
    if (onStop) onStop(blob, dur);
  };

  return {
    startRecording: () => { chunks.length = 0; recorder.start(200); },
    stopRecording: () => { if (recorder.state !== 'inactive') recorder.stop(); },
  };
};
