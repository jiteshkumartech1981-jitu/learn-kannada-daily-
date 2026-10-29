// ─── AUDIO ENGINE ───────────────────────────────────────────────────────────
// Uses ONLY the browser's built-in Web Speech API (SpeechSynthesis)
// No external URLs — works in Brave, Chrome, Edge, Firefox on all OS.

let _voices = [];
let _voicesLoaded = false;

// Pre-load voices as soon as the module is imported
const _loadVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const v = window.speechSynthesis.getVoices();
  if (v.length > 0) {
    _voices = v;
    _voicesLoaded = true;
  }
};

// Call immediately
_loadVoices();

// Also attach to voiceschanged (Chrome/Edge trigger this asynchronously)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    _voices = window.speechSynthesis.getVoices();
    _voicesLoaded = true;
  });
}

// Pick the best available voice for Kannada / Indian
const _getBestVoice = () => {
  if (!_voicesLoaded) {
    _voices = window.speechSynthesis.getVoices();
  }

  // Priority 1: Actual Kannada voice
  const kn = _voices.find(v => v.lang === 'kn-IN' || v.lang.startsWith('kn'));
  if (kn) return { voice: kn, lang: kn.lang };

  // Priority 2: Any Indian English voice (sounds natural for Kannada text)
  const inEn = _voices.find(v => v.lang === 'en-IN');
  if (inEn) return { voice: inEn, lang: 'kn-IN' };

  // Priority 3: Hindi voice (closest phonetics to Kannada)
  const hi = _voices.find(v => v.lang === 'hi-IN' || v.lang === 'hi');
  if (hi) return { voice: hi, lang: 'kn-IN' };

  // Priority 4: Any English voice
  const en = _voices.find(v => v.lang.startsWith('en'));
  if (en) return { voice: en, lang: 'kn-IN' };

  return { voice: null, lang: 'kn-IN' };
};

// ── Main TTS function ───────────────────────────────────────────────────────
// rate: 1.3 = normal fast, 1.0 = learner slow
export const playKannadaTTS = (text, rate = 1.3, onEndCallback = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported in this browser.');
    if (onEndCallback) onEndCallback();
    return;
  }

  // Stop any currently speaking utterance
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text.trim());
  utterance.rate = Math.max(0.5, Math.min(2.0, rate)); // Clamp between 0.5–2.0
  utterance.pitch = 1.05;
  utterance.volume = 1.0;

  const { voice, lang } = _getBestVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = lang;

  utterance.onend = () => {
    if (onEndCallback) onEndCallback();
  };
  utterance.onerror = (e) => {
    console.warn('SpeechSynthesis error:', e.error);
    if (onEndCallback) onEndCallback();
  };

  // Chromium bug workaround: sometimes speechSynthesis gets stuck in paused state
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);

  // Safety fallback: if voices weren't loaded yet, retry once after 300ms
  if (!_voicesLoaded) {
    setTimeout(() => {
      const { voice: v2, lang: l2 } = _getBestVoice();
      if (v2 && utterance.voice !== v2) {
        window.speechSynthesis.cancel();
        utterance.voice = v2;
        utterance.lang = l2;
        window.speechSynthesis.speak(utterance);
      }
    }, 300);
  }
};

// ─── SPEECH RECOGNITION ─────────────────────────────────────────────────────

export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

export const createSpeechRecognizer = ({ onResult, onError, onEnd }) => {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'kn-IN';

  let hasResult = false;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    hasResult = true;
    if (onResult) {
      const isFinal = event.results[event.results.length - 1].isFinal;
      onResult(transcript, isFinal);
    }
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd(hasResult);
  };

  return recognition;
};

// ─── SCORE EVALUATOR ─────────────────────────────────────────────────────────

export const evaluatePronunciation = (spoken, targetKannada, targetKeywords = []) => {
  if (!spoken) return 0;
  const cleanSpoken = spoken.trim().toLowerCase();

  let matches = 0;
  for (const kw of targetKeywords) {
    if (cleanSpoken.includes(kw.toLowerCase())) matches++;
  }

  if (targetKeywords.length > 0 && matches > 0) {
    return Math.min(100, Math.round((matches / targetKeywords.length) * 100));
  }

  const targetWords = targetKannada.split(/\s+/);
  let wordMatches = 0;
  for (const word of targetWords) {
    if (cleanSpoken.includes(word.toLowerCase())) wordMatches++;
  }

  if (wordMatches > 0) {
    return Math.min(100, Math.round((wordMatches / targetWords.length) * 100));
  }

  return Math.min(95, Math.max(45, Math.round(cleanSpoken.length * 9)));
};
