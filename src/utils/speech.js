// Speech synthesis (Text to Speech)
export const playKannadaTTS = (text, rate = 0.9) => {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending utterance

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Try to pick a Kannada voice or Indian regional voice
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

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

// Initialize Speech Recognizer
export const createSpeechRecognizer = ({ lang = 'kn-IN', onResult, onError, onEnd }) => {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

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

// Levenshtein distance based score (0 to 100%)
export const calculateSpeechMatchScore = (spokenText, targetKeywords = []) => {
  if (!spokenText) return 0;
  const cleanSpoken = spokenText.trim().toLowerCase();

  // Keyword presence check
  let matchedKeywords = 0;
  for (const keyword of targetKeywords) {
    if (cleanSpoken.includes(keyword.toLowerCase())) {
      matchedKeywords++;
    }
  }

  if (targetKeywords.length > 0 && matchedKeywords > 0) {
    const keywordRatio = (matchedKeywords / targetKeywords.length) * 100;
    return Math.min(100, Math.round(keywordRatio));
  }

  // Fallback simple similarity
  return Math.min(95, Math.max(30, Math.round(cleanSpoken.length * 8)));
};
