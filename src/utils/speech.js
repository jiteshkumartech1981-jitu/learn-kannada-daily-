// Speech synthesis (Text to Speech) with speed control
export const playKannadaTTS = (text, rate = 0.9) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel(); // Stop current speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const kannadaVoice = voices.find(
    v => v.lang === 'kn-IN' || v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada')
  ) || voices.find(
    v => v.lang === 'hi-IN' || v.lang === 'en-IN'
  );

  if (kannadaVoice) {
    utterance.voice = kannadaVoice;
  }
  utterance.lang = 'kn-IN';

  window.speechSynthesis.speak(utterance);
};

// Check if browser speech recognition is supported
export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

// Create Speech Recognizer instance for Kannada
export const createSpeechRecognizer = ({ onResult, onError, onEnd }) => {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'kn-IN';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    if (onResult) {
      const isFinal = event.results[event.results.length - 1].isFinal;
      onResult(transcript, isFinal);
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
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
    if (cleanSpoken.includes(word)) {
      wordMatches++;
    }
  }

  if (wordMatches > 0) {
    return Math.min(100, Math.round((wordMatches / targetWords.length) * 100));
  }

  return Math.min(90, Math.max(35, Math.round(cleanSpoken.length * 8)));
};
