import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw,
  Bot,
  Send,
  Zap
} from 'lucide-react';
import { PRONUNCIATION_CHALLENGES } from '../data/pronunciationChallenges';
import { 
  playKannadaTTS, 
  isSpeechRecognitionSupported, 
  createSpeechRecognizer, 
  calculateSpeechMatchScore 
} from '../utils/speech';
import confetti from 'canvas-confetti';

export default function VoiceCoachView() {
  const [selectedChallengeId, setSelectedChallengeId] = useState(PRONUNCIATION_CHALLENGES[0].id);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Conversational Assistant state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕನ್ನಡ ಧ್ವನಿ ಸಹಾಯಕ. Ask me any question in Kannada or English!'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const recognitionRef = useRef(null);

  const activeChallenge = PRONUNCIATION_CHALLENGES.find(c => c.id === selectedChallengeId) || PRONUNCIATION_CHALLENGES[0];

  useEffect(() => {
    setSpeechSupported(isSpeechRecognitionSupported());
  }, []);

  const startListening = () => {
    if (!speechSupported) {
      alert('Speech Recognition is not supported on this browser. Try Chrome or Edge.');
      return;
    }

    setTranscript('');
    setMatchScore(null);
    setIsRecording(true);

    const recognizer = createSpeechRecognizer({
      lang: 'kn-IN',
      onResult: (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          evaluateSpeech(text);
        }
      },
      onError: (err) => {
        console.error('Voice coach error:', err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    if (recognizer) {
      recognitionRef.current = recognizer;
      try {
        recognizer.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    if (transcript) {
      evaluateSpeech(transcript);
    }
  };

  const evaluateSpeech = (spoken) => {
    const score = calculateSpeechMatchScore(spoken, activeChallenge.targetKeywords);
    setMatchScore(score);

    if (score >= 80) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  // Conversational Assistant Handler
  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userQuery = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setChatInput('');
    setIsThinking(true);

    // Dynamic smart responses for common queries
    setTimeout(() => {
      let botReply = '';
      const lower = userQuery.toLowerCase();

      if (lower.includes('coffee') || lower.includes('ಕಾಫಿ')) {
        botReply = 'ನೀವು ಹೀಗೆ ಕೇಳಬಹುದು: "ಒಂದು ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ" (Ondu bisi filter coffee kodi).';
      } else if (lower.includes('how are you') || lower.includes('ಹೇಗಿದ್ದೀರಾ')) {
        botReply = 'ಕನ್ನಡದಲ್ಲಿ: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು! ನೀವು ಹೇಗಿದ್ದೀರಿ?" (I am good, thank you! How are you?)';
      } else if (lower.includes('bill') || lower.includes('cost') || lower.includes('ಎಷ್ಟು')) {
        botReply = 'ಖಂಡಿತ: "ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?" (Idu eshtu roopaayi?) ಅಥವಾ "ಬಿಲ್ ಕೊಡಿ" (Bill kodi).';
      } else if (lower.includes('water') || lower.includes('ನೀರು')) {
        botReply = 'ಹೀಗೆ ಹೇಳಿ: "ದಯವಿಟ್ಟು ಕುಡಿಯಲು ನೀರು ಕೊಡಿ" (Dayavittu kudiyalu neeru kodi).';
      } else {
        botReply = `ತುಂಬಾ ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! In Kannada you can say: "ಧನ್ಯವಾದಗಳು, ನಾನು ಕಲಿಯುತ್ತಿದ್ದೇನೆ" (Thank you, I am learning).`;
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsThinking(false);
      playKannadaTTS(botReply);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-linear-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="space-y-2">
          <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-xs">
            Challenge 02
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Voice of Kannada — AI Speech & Pronunciation Coach
          </h1>
          <p className="font-kannada text-lg font-semibold text-amber-200">
            ಧ್ವನಿ ತಂತ್ರಜ್ಞಾನ — ಕನ್ನಡ ಮಾತನಾಡಿ, ಉಚ್ಚಾರಣೆ ಸುಧಾರಿಸಿ
          </p>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
            Real-time speech recognition engine trained on Kannada speech patterns. Speak through your microphone to get instant accuracy scores and phonetic guidance.
          </p>
        </div>
      </div>

      {/* Main Pronunciation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Challenge Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Practice Challenges
          </h2>
          <div className="space-y-2">
            {PRONUNCIATION_CHALLENGES.map((item) => {
              const isSelected = item.id === selectedChallengeId;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedChallengeId(item.id);
                    setTranscript('');
                    setMatchScore(null);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400 shadow-xs'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.difficultyColor}`}>
                      {item.level}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playKannadaTTS(item.kannada);
                      }}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-kannada font-bold text-sm text-slate-900">
                    {item.kannada}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.transliteration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Live Recording & Evaluation Bench */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Target Display */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Target Phrase ({activeChallenge.level})
              </span>
              <div className="font-kannada text-3xl sm:text-4xl font-extrabold text-slate-900">
                {activeChallenge.kannada}
              </div>
              <div className="text-sm font-semibold text-amber-700">
                Phonetic: {activeChallenge.transliteration}
              </div>
              <div className="text-xs text-slate-600 italic">
                "{activeChallenge.english}"
              </div>

              {/* Native Audio Listen */}
              <div className="pt-2">
                <button
                  onClick={() => playKannadaTTS(activeChallenge.kannada)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-bold transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>Listen to Native Audio</span>
                </button>
              </div>
            </div>

            {/* Phonetic Tip */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pronunciation Coach Tip:</strong> {activeChallenge.phoneticTip}
              </div>
            </div>

            {/* Live Recognized Speech Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Recognized Speech (Transcribed via AI)</span>
                {isRecording && (
                  <span className="flex items-center gap-1.5 text-red-600 animate-pulse font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    Listening in Kannada...
                  </span>
                )}
              </div>
              <div className="min-h-16 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-center">
                {transcript ? (
                  <span className="font-kannada text-lg font-bold text-slate-900">
                    "{transcript}"
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    {isRecording
                      ? 'Speak now into your microphone...'
                      : 'Click the microphone button below and read the phrase aloud.'}
                  </span>
                )}
              </div>
            </div>

            {/* Accuracy Score Card */}
            {matchScore !== null && (
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                matchScore >= 80
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm ${
                    matchScore >= 80 ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {matchScore}%
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      {matchScore >= 80 ? 'Superb! ಸಕ್ಕತ್ ಆಗಿದೆ!' : 'Good Effort! ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!'}
                    </h4>
                    <p className="text-xs opacity-90">
                      {matchScore >= 80
                        ? 'Your pronunciation matches native Kannada rhythm.'
                        : 'Practice one more time to sharpen the vowel endings.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTranscript('');
                    setMatchScore(null);
                  }}
                  className="p-2 text-slate-500 hover:text-slate-800"
                  title="Retry"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Microphone Action Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center gap-3">
            <button
              onClick={isRecording ? stopListening : startListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                isRecording
                  ? 'bg-red-600 scale-110 animate-pulse ring-4 ring-red-200'
                  : 'bg-linear-to-r from-red-600 to-amber-500 hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
            <span className="text-xs font-semibold text-slate-600">
              {isRecording ? 'Click to Stop Recording' : 'Push to Speak in Kannada'}
            </span>
          </div>

        </div>

      </div>

      {/* Conversational Voice Assistant Demo */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-red-600 flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Kannada AI Voice Companion (ಕನ್ನಡ ಮಿತ್ರ)
            </h3>
            <p className="text-xs text-slate-500">
              Ask questions about what to say in Karnataka; answers are spoken back in Kannada.
            </p>
          </div>
        </div>

        {/* Chat History */}
        <div className="space-y-3 max-h-60 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ಕ
                </div>
              )}
              <div
                className={`max-w-md p-3 rounded-xl text-xs font-medium leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === 'bot' && (
                <button
                  onClick={() => playKannadaTTS(msg.text)}
                  className="p-1 text-slate-400 hover:text-amber-600 self-center"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="text-xs text-slate-400 italic flex items-center gap-1">
              <span className="animate-spin">⏳</span> Thinking in Kannada...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
            placeholder="E.g., How do I ask for the bill? or How are you?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          <button
            onClick={handleChatSend}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </div>
      </div>

    </div>
  );
}
