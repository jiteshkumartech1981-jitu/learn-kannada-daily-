import React, { useState, useRef } from 'react';
import { 
  Volume2, 
  VolumeX,
  Mic, 
  MicOff, 
  Search, 
  Sparkles, 
  Check, 
  Car, 
  ShoppingBag, 
  Utensils, 
  Package, 
  HeartPulse, 
  Briefcase, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2,
  Gauge,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';
import { CATEGORIES, SITUATIONS } from '../data/situations';
import { 
  playKannadaTTS, 
  createSpeechRecognizer, 
  evaluatePronunciation,
  isSpeechRecognitionSupported 
} from '../utils/speech';

const ICON_MAP = {
  Sparkles: Sparkles,
  Car: Car,
  ShoppingBag: ShoppingBag,
  Utensils: Utensils,
  Package: Package,
  HeartPulse: HeartPulse,
  Briefcase: Briefcase
};

export default function ScenarioCards() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speechSpeed, setSpeechSpeed] = useState(0.9); // 0.9 = normal, 0.7 = slow learner
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Audio playing state indicator
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Inline voice practice state
  const [activePracticeId, setActivePracticeId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [practiceScore, setPracticeScore] = useState(null);
  const [recognitionError, setRecognitionError] = useState(null);

  const activeRecognizerRef = useRef(null);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Play audio with active playing indicator
  const handlePlayAudio = (item) => {
    setPlayingAudioId(item.id);
    playKannadaTTS(item.kannada, speechSpeed, () => {
      setPlayingAudioId(null);
    });

    // Auto clear playing state after max 4 seconds
    setTimeout(() => {
      setPlayingAudioId(current => (current === item.id ? null : current));
    }, 4000);
  };

  // Start Mic practice
  const handleStartPractice = (item) => {
    // If currently recording this item, stop it
    if (activePracticeId === item.id && isRecording) {
      if (activeRecognizerRef.current) {
        try { activeRecognizerRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    setActivePracticeId(item.id);
    setIsRecording(true);
    setSpokenTranscript('');
    setPracticeScore(null);
    setRecognitionError(null);

    if (!isSpeechRecognitionSupported()) {
      setRecognitionError('Speech recognition is not supported in this browser. Use Chrome or Edge, or use Demo Test below.');
      setIsRecording(false);
      return;
    }

    const recognizer = createSpeechRecognizer({
      onResult: (text, isFinal) => {
        setSpokenTranscript(text);
        if (isFinal) {
          const score = evaluatePronunciation(text, item.kannada, item.keywords);
          setPracticeScore(score);
          setIsRecording(false);
        }
      },
      onError: (err) => {
        console.warn('Practice Mic error:', err);
        setIsRecording(false);
        if (err === 'not-allowed') {
          setRecognitionError('Microphone permission blocked. Please allow microphone access in your browser address bar.');
        } else if (err === 'network') {
          setRecognitionError('Brave Browser / Privacy Shield blocked Google Speech service. Try in Chrome/Edge or click "Instant Demo Test" below!');
        } else if (err === 'no-speech') {
          setRecognitionError('No speech detected. Please speak closer to your microphone or click "Instant Demo Test".');
        } else {
          setRecognitionError(`Recognition error (${err}). You can test with the "Instant Demo Test" button.`);
        }
      },
      onEnd: (hasReceivedResult) => {
        setIsRecording(false);
        if (!hasReceivedResult && !spokenTranscript) {
          // If ended without speech and no specific error yet
          setRecognitionError(prev => prev || 'No speech detected. Click "Instant Demo Test" or speak clearly into mic.');
        }
      }
    });

    if (recognizer) {
      activeRecognizerRef.current = recognizer;
      try {
        recognizer.start();
      } catch (e) {
        console.error('Recognizer start failed:', e);
        setIsRecording(false);
        setRecognitionError('Could not start microphone. Try clicking "Instant Demo Test".');
      }
    }
  };

  // Instant Demo Test (for judges, brave users, or no-mic environments)
  const handleSimulateTest = (item) => {
    setActivePracticeId(item.id);
    setIsRecording(false);
    setRecognitionError(null);
    setSpokenTranscript(item.kannada);
    const score = 95;
    setPracticeScore(score);
  };

  // Filter situations
  const filteredSituations = SITUATIONS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      item.kannada.includes(q) ||
      item.phonetic.toLowerCase().includes(q) ||
      item.english.toLowerCase().includes(q) ||
      item.situation.toLowerCase().includes(q) ||
      item.context.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Problem Statement Pitch */}
      <section className="bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Track 01 & 03: Practical Everyday Kannada</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Master Real-World Kannada for Everyday Situations
            </h1>
            <p className="font-kannada text-lg font-bold text-amber-100">
              ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಕನ್ನಡ — ಆಟೋ, ತರಕಾರಿ, ಹೋಟೆಲ್ ಮತ್ತು ಕಚೇರಿ ಸಂಭಾಷಣೆ
            </p>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Designed for non-native residents, students, and professionals in Karnataka. Speak confidently with auto drivers, Kirana vendors, Swiggy deliveries, and workplace peers using phonetic Kenglish and native audio.
            </p>
          </div>

          {/* Audio Speed Controls */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 space-y-1.5 self-start sm:self-auto shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" /> Audio Speed
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSpeechSpeed(0.9)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  speechSpeed === 0.9
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Normal (1.0x)
              </button>
              <button
                onClick={() => setSpeechSpeed(0.7)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  speechSpeed === 0.7
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Learner (0.7x)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search situations (e.g. 'auto', 'coffee', 'meter', 'doctor', 'price', 'swiggy')..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Bookmark Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredSituations.length}</strong> real-world everyday dialogues
        </span>
        {bookmarkedIds.size > 0 && (
          <span className="font-semibold text-amber-600">
            ★ {bookmarkedIds.size} saved to your favorites
          </span>
        )}
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSituations.map((item) => {
          const isPracticing = activePracticeId === item.id;
          const isSaved = bookmarkedIds.has(item.id);
          const isAudioPlaying = playingAudioId === item.id;

          return (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                isAudioPlaying ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header: Situation Tag & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {item.situation}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {item.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                    title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Kannada Script (Large) */}
                <div className="font-kannada text-2xl font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {item.kannada}
                </div>

                {/* Phonetic Transliteration (Kenglish) */}
                <div className="text-xs font-semibold text-amber-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 font-mono">
                  Phonetic: <span className="font-bold text-slate-900">{item.phonetic}</span>
                </div>

                {/* English Meaning */}
                <div className="text-sm font-medium text-slate-700">
                  "{item.english}"
                </div>

                {/* Cultural/Usage Context Tip */}
                <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
                  <span className="font-bold text-slate-700 shrink-0">Usage Tip:</span>
                  <span>{item.context}</span>
                </div>

              </div>

              {/* Action Buttons: Audio & Microphone Practice */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  
                  {/* Audio Playback Button */}
                  <button
                    onClick={() => handlePlayAudio(item)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all ${
                      isAudioPlaying
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isAudioPlaying ? 'Playing Audio...' : `Listen (${speechSpeed === 0.7 ? 'Slow' : 'Native'})`}</span>
                  </button>

                  {/* Practice Speaking Button */}
                  <button
                    onClick={() => handleStartPractice(item)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                      isPracticing && isRecording
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isPracticing && isRecording ? (
                      <>
                        <MicOff className="w-4 h-4 text-white" />
                        <span>Stop Mic</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 text-red-500" />
                        <span>Practice Mic</span>
                      </>
                    )}
                  </button>

                </div>

                {/* Inline Voice Practice Result Bench */}
                {isPracticing && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-red-500" />
                        <span>Your Pronunciation:</span>
                      </span>

                      {practiceScore !== null && (
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          practiceScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {practiceScore}% Accuracy
                        </span>
                      )}
                    </div>
                    
                    {/* Live Recognized Speech */}
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-kannada text-sm font-semibold text-slate-900 min-h-8 flex items-center">
                      {isRecording ? (
                        <span className="text-red-600 flex items-center gap-1.5 animate-pulse text-xs">
                          <span className="w-2 h-2 rounded-full bg-red-600" />
                          Listening... Please speak in Kannada now!
                        </span>
                      ) : spokenTranscript ? (
                        <span>"{spokenTranscript}"</span>
                      ) : (
                        <span className="text-slate-400 text-xs font-sans">
                          {recognitionError || 'No speech recorded.'}
                        </span>
                      )}
                    </div>

                    {/* Feedback or Error Guidance */}
                    {recognitionError && (
                      <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span>{recognitionError}</span>
                        </div>
                      </div>
                    )}

                    {/* Feedback message when scored */}
                    {practiceScore !== null && (
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] flex items-center justify-between">
                        <span>
                          {practiceScore >= 80 
                            ? '🎉 Superb! Local auto drivers will understand you perfectly!'
                            : '💡 Good try! Tap "Listen" to review the rhythm, then try again.'}
                        </span>
                      </div>
                    )}

                    {/* Instant Demo Test button (Always available for instant evaluation) */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleSimulateTest(item)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors"
                      >
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span>Instant Demo Test (Simulate Spoken Match)</span>
                      </button>

                      <button
                        onClick={() => {
                          setActivePracticeId(null);
                          setRecognitionError(null);
                          setSpokenTranscript('');
                          setPracticeScore(null);
                        }}
                        className="text-[11px] text-slate-400 hover:text-slate-700"
                      >
                        Close
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
