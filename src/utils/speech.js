// Global audio instance to stop any previous audio
let currentAudioInstance = null;

// Dual-Engine Audio: Native Kannada Online TTS + SpeechSynthesis Fallback
export const playKannadaTTS = (text, rate = 0.9, onEndCallback = null) => {
  if (typeof window === 'undefined') return;

  // Stop any active audio
  if (currentAudioInstance) {
    currentAudioInstance.pause();
    currentAudioInstance.currentTime = 0;
    currentAudioInstance = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Engine 1: Google Native Kannada Neural TTS Audio (Works on ALL browsers including Windows & Brave)
  try {
    const encodedText = encodeURIComponent(text.trim());
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encodedText}`;
    const audio = new Audio(ttsUrl);
    audio.playbackRate = rate;
    currentAudioInstance = audio;

    audio.onended = () => {
      currentAudioInstance = null;
      if (onEndCallback) onEndCallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Online Kannada TTS blocked or offline, falling back to SpeechSynthesis:', err);
        fallbackToSpeechSynthesis(text, rate, onEndCallback);
      });
    }
    return;
  } catch (err) {
    console.warn('Audio element error, using SpeechSynthesis:', err);
    fallbackToSpeechSynthesis(text, rate, onEndCallback);
  }
};

// Fallback Engine 2: Local browser SpeechSynthesis
const fallbackToSpeechSynthesis = (text, rate, onEndCallback) => {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const kannadaVoice = voices.find(
    v => v.lang === 'kn-IN' || v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada')
  ) || voices.find(
    v => v.lang.includes('IN')
  );

  if (kannadaVoice) {
    utterance.voice = kannadaVoice;
  }
  utterance.lang = kannadaVoice ? kannadaVoice.lang : 'hi-IN';

  utterance.onend = () => {
    if (onEndCallback) onEndCallback();
  };
  utterance.onerror = () => {
    if (onEndCallback) onEndCallback();
  };

  // Chromium fix for paused synthesis bug
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);
};

// Check if browser speech recognition is supported
export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

// Create Speech Recognizer instance for Kannada with robust error handling
export const createSpeechRecognizer = ({ onResult, onError, onEnd }) => {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'kn-IN';

  let hasReceivedResult = false;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    hasReceivedResult = true;
    if (onResult) {
      const isFinal = event.results[event.results.length - 1].isFinal;
      onResult(transcript, isFinal);
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error event:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd(hasReceivedResult);
  };

  return recognition;
};

// Calculate match score between spoken text and target Kannada text
export const evaluatePronunciation = (spoken, targetKannada, targetKeywords = []) => {
  if (!spoken) return 0;
  const cleanSpoken = spoken.trim().toLowerCase();
  
  let matches = 0;
  for (const kw of targetKeywords) {
    if (cleanSpoken.includes(kw.toLowerCase())) {
      matches++;
    }
  }

  if (targetKeywords.length > 0 && matches > 0) {
    return Math.min(100, Math.round((matches / targetKeywords.length) * 100));
  }

  // Token overlap check
  const targetWords = targetKannada.split(/\s+/);
  let wordMatches = 0;
  for (const word of targetWords) {
    if (cleanSpoken.includes(word.toLowerCase())) {
      wordMatches++;
    }
  }

  if (wordMatches > 0) {
    return Math.min(100, Math.round((wordMatches / targetWords.length) * 100));
  }

  return Math.min(95, Math.max(45, Math.round(cleanSpoken.length * 9)));
};
