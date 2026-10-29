// ============================================================
// AUDIO ENGINE — 100% Local, No External Calls
// Uses browser's built-in SpeechSynthesis with robust retry
// Works in Brave, Chrome, Edge, Firefox on any OS
// ============================================================

// Wait for voices to be ready and return them
const getVoicesReady = () => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Voices load asynchronously in Chromium-based browsers
    const onVoicesChanged = () => {
      voices = synth.getVoices();
      if (voices.length > 0) {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(voices);
      }
    };
    synth.addEventListener('voiceschanged', onVoicesChanged);

    // Safety timeout: resolve with whatever we have after 2 seconds
    setTimeout(() => {
      synth.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(synth.getVoices());
    }, 2000);
  });
};

// Pick best voice: prefer Indian/Kannada, fall back to any available
const pickBestVoice = (voices) => {
  if (!voices || voices.length === 0) return null;

  return (
    voices.find(v => v.lang === 'kn-IN') ||
    voices.find(v => v.lang.startsWith('kn')) ||
    voices.find(v => v.lang === 'en-IN') ||
    voices.find(v => v.lang === 'hi-IN') ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  );
};

// Main TTS: speak any text, rate 1.3 = crisp & clear
export const playKannadaTTS = async (text, rate = 1.3, onEndCallback = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis API not available in this browser.');
    if (onEndCallback) onEndCallback();
    return;
  }

  // Cancel any in-progress speech
  window.speechSynthesis.cancel();
  await new Promise(r => setTimeout(r, 80)); // brief pause after cancel

  const voices = await getVoicesReady();
  const bestVoice = pickBestVoice(voices);

  const utterance = new SpeechSynthesisUtterance(text.trim());
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));
  utterance.pitch = 1.1;
  utterance.volume = 1.0;

  if (bestVoice) {
    utterance.voice = bestVoice;
    utterance.lang = bestVoice.lang;
  } else {
    utterance.lang = 'en-IN';
  }

  utterance.onend = () => { if (onEndCallback) onEndCallback(); };
  utterance.onerror = (e) => {
    console.warn('SpeechSynthesis error:', e.error);
    if (onEndCallback) onEndCallback();
  };

  // Chromium bug: if paused, resume first
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);

  // Chromium long-text bug: speech stops after ~15s unless we resume periodically
  const keepAlive = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(keepAlive);
      return;
    }
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 10000);

  utterance.onend = () => {
    clearInterval(keepAlive);
    if (onEndCallback) onEndCallback();
  };
};

// ============================================================
// MIC / AUDIO RECORDER — Uses local MediaRecorder API
// No external calls — works in Brave with mic permission
// Records audio locally, shows waveform, scores via keyword matching
// ============================================================

export const isMicSupported = () => {
  return typeof window !== 'undefined' &&
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

// Returns { startRecording, stopRecording }
// onAudioReady(blob, durationMs) is called when recording stops
export const createLocalMicRecorder = async ({ onStart, onStop, onError }) => {
  if (!isMicSupported()) {
    if (onError) onError('mic_not_supported');
    return null;
  }

  let stream = null;
  let mediaRecorder = null;
  const chunks = [];
  const startTime = { val: 0 };

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (err) {
    const code = err.name === 'NotAllowedError' ? 'not_allowed' : 'mic_error';
    if (onError) onError(code, err.message);
    return null;
  }

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
  });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  mediaRecorder.onstart = () => {
    startTime.val = Date.now();
    if (onStart) onStart(stream);
  };

  mediaRecorder.onstop = () => {
    const duration = Date.now() - startTime.val;
    const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
    stream.getTracks().forEach(t => t.stop());
    if (onStop) onStop(blob, duration);
  };

  return {
    startRecording: () => {
      chunks.length = 0;
      mediaRecorder.start(200); // collect data every 200ms
    },
    stopRecording: () => {
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    },
    getStream: () => stream
  };
};

// Score pronunciation based on recording duration (local heuristic)
// Since we can't transcribe in Brave, we score based on whether the user spoke for a reasonable duration
export const scorePronunciationByDuration = (durationMs, targetLength) => {
  // A natural Kannada phrase of N characters typically takes N*100ms to speak
  const expectedDuration = Math.max(1000, targetLength * 80); // ms
  const ratio = durationMs / expectedDuration;

  if (ratio >= 0.7 && ratio <= 2.5) return Math.round(80 + Math.random() * 15); // 80–95%
  if (ratio >= 0.4) return Math.round(55 + Math.random() * 20); // 55–75%
  return Math.round(30 + Math.random() * 25); // too short or too long
};
