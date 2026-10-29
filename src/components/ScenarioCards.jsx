import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  Search,
  Sparkles,
  Car,
  ShoppingBag,
  Utensils,
  Package,
  HeartPulse,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  Gauge,
  AlertTriangle,
  Zap,
  CheckCircle2,
  AudioLines,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES, SITUATIONS } from '../data/situations';
import {
  playKannadaTTS,
  isMicSupported,
  createLocalMicRecorder,
  scorePronunciationByDuration
} from '../utils/speech';

const ICON_MAP = {
  Sparkles, Car, ShoppingBag, Utensils, Package, HeartPulse, Briefcase
};

export default function ScenarioCards() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speechSpeed, setSpeechSpeed] = useState(1.3);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Audio state
  const [playingId, setPlayingId] = useState(null);

  // Mic practice state
  const [practiceCardId, setPracticeCardId] = useState(null);
  const [micStatus, setMicStatus] = useState('idle'); // 'idle' | 'requesting' | 'recording' | 'scored' | 'error'
  const [micScore, setMicScore] = useState(null);
  const [micError, setMicError] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (recorderRef.current) {
        try { recorderRef.current.stopRecording(); } catch (_) {}
      }
    };
  }, []);

  // ─── AUDIO PLAYBACK ────────────────────────────────────────────────────────
  const handleListen = async (item) => {
    setPlayingId(item.id);
    await playKannadaTTS(item.kannada, speechSpeed, () => {
      setPlayingId(null);
    });
    // Fallback clear after max 6s
    setTimeout(() => setPlayingId(id => id === item.id ? null : id), 6000);
  };

  // ─── MIC PRACTICE ─────────────────────────────────────────────────────────
  const handleStartPractice = async (item) => {
    // Toggle off if already practicing this card
    if (practiceCardId === item.id && micStatus === 'recording') {
      clearInterval(timerRef.current);
      if (recorderRef.current) recorderRef.current.stopRecording();
      return;
    }

    // Reset state
    setPracticeCardId(item.id);
    setMicStatus('requesting');
    setMicScore(null);
    setMicError('');
    setRecordingSeconds(0);

    const recorder = await createLocalMicRecorder({
      onStart: (_stream) => {
        setMicStatus('recording');
        setRecordingSeconds(0);
        timerRef.current = setInterval(() => {
          setRecordingSeconds(s => s + 1);
        }, 1000);
      },
      onStop: (blob, durationMs) => {
        clearInterval(timerRef.current);
        const score = scorePronunciationByDuration(durationMs, item.kannada.length);
        setMicScore(score);
        setMicStatus('scored');
        recorderRef.current = null;
      },
      onError: (code, msg) => {
        clearInterval(timerRef.current);
        setMicStatus('error');
        recorderRef.current = null;

        if (code === 'not_allowed') {
          setMicError('Microphone access was denied. Click the 🔒 lock icon in your browser address bar → Allow Microphone → Refresh page.');
        } else if (code === 'mic_not_supported') {
          setMicError('This browser does not support microphone access. Please use Chrome, Edge, or Firefox.');
        } else {
          setMicError(`Microphone error: ${msg || code}. Please check your microphone is connected.`);
        }
      }
    });

    if (!recorder) return; // error already set inside createLocalMicRecorder

    recorderRef.current = recorder;
    recorder.startRecording();
  };

  const handleStopRecording = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current) recorderRef.current.stopRecording();
  };

  const handleDemoTest = (item) => {
    clearInterval(timerRef.current);
    setPracticeCardId(item.id);
    setMicStatus('scored');
    setMicScore(92);
    setMicError('');
  };

  const handleClosePractice = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current) {
      try { recorderRef.current.stopRecording(); } catch (_) {}
    }
    setPracticeCardId(null);
    setMicStatus('idle');
    setMicScore(null);
    setMicError('');
    setRecordingSeconds(0);
    recorderRef.current = null;
  };

  // ─── BOOKMARK ─────────────────────────────────────────────────────────────
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  // ─── FILTER ───────────────────────────────────────────────────────────────
  const filtered = SITUATIONS.filter(item => {
    const catOk = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return catOk;
    const textOk =
      item.kannada.includes(q) ||
      item.phonetic.toLowerCase().includes(q) ||
      item.english.toLowerCase().includes(q) ||
      item.situation.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q));
    return catOk && textOk;
  });

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 pb-16">

      {/* ── Hero Banner ── */}
      <section className="bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Track 01 & 03: Practical Everyday Kannada
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Master Real-World Kannada for Everyday Situations
            </h1>
            <p className="font-kannada text-lg font-bold text-amber-100">
              ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಕನ್ನಡ — ಆಟೋ, ತರಕಾರಿ, ಹೋಟೆಲ್ ಮತ್ತು ಕಚೇರಿ ಸಂಭಾಷಣೆ
            </p>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Practical Kannada for non-native residents in Karnataka. Audio powered by your browser's built-in voice engine — no internet required!
            </p>
          </div>

          {/* Speed Controls */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 space-y-1.5 self-start sm:self-auto shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" /> Audio Speed
            </span>
            <div className="flex gap-1.5">
              {[
                { label: 'Fast (1.6x)', rate: 1.6 },
                { label: 'Normal (1.3x)', rate: 1.3 },
                { label: 'Slow (1.0x)', rate: 1.0 },
              ].map(({ label, rate }) => (
                <button
                  key={rate}
                  onClick={() => setSpeechSpeed(rate)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    speechSpeed === rate
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search (e.g. 'auto', 'coffee', 'meter', 'doctor', 'swiggy')..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700">
              Clear
            </button>
          )}
        </div>
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const sel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  sel ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> real-world everyday dialogues</span>
        {bookmarkedIds.size > 0 && (
          <span className="font-semibold text-amber-600">★ {bookmarkedIds.size} saved</span>
        )}
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => {
          const isPlaying   = playingId === item.id;
          const isPractice  = practiceCardId === item.id;
          const isSaved     = bookmarkedIds.has(item.id);
          const isRecording = isPractice && micStatus === 'recording';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                isPlaying ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200 hover:border-amber-400'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {item.situation}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">{item.difficulty}</span>
                  </div>
                  <button onClick={() => toggleBookmark(item.id)} className="p-1 text-slate-400 hover:text-amber-500 transition-colors">
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="font-kannada text-2xl font-bold text-slate-900 hover:text-red-600 transition-colors leading-snug">
                  {item.kannada}
                </div>
                <div className="text-xs font-semibold text-amber-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 font-mono">
                  Phonetic: <span className="font-bold text-slate-900">{item.phonetic}</span>
                </div>
                <div className="text-sm font-medium text-slate-700">"{item.english}"</div>
                <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
                  <span className="font-bold text-slate-700 shrink-0">Usage Tip:</span>
                  <span>{item.context}</span>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex gap-2">

                  {/* Listen Button */}
                  <button
                    onClick={() => handleListen(item)}
                    disabled={isPlaying}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all ${
                      isPlaying
                        ? 'bg-amber-600 text-white cursor-wait'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                    {isPlaying ? 'Speaking...' : `Listen (${speechSpeed === 1.0 ? 'Slow' : speechSpeed === 1.6 ? 'Fast' : 'Normal'})`}
                  </button>

                  {/* Practice Mic Button */}
                  <button
                    onClick={() => {
                      if (isRecording) {
                        handleStopRecording();
                      } else {
                        handleStartPractice(item);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : isPractice && micStatus === 'requesting'
                          ? 'bg-slate-200 text-slate-500 border-slate-200 cursor-wait'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isRecording ? (
                      <><MicOff className="w-4 h-4" /> Stop ({recordingSeconds}s)</>
                    ) : isPractice && micStatus === 'requesting' ? (
                      <><Mic className="w-4 h-4" /> Requesting Mic...</>
                    ) : (
                      <><Mic className="w-4 h-4 text-red-500" /> Practice Mic</>
                    )}
                  </button>
                </div>

                {/* ── Practice Panel ── */}
                {isPractice && micStatus !== 'idle' && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">

                    {/* Recording Waveform Indicator */}
                    {isRecording && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-end gap-0.5 h-6">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-red-500 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.08}s`,
                                minHeight: '4px'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-red-600">
                          Recording your voice... ({recordingSeconds}s)
                        </span>
                        <button
                          onClick={handleStopRecording}
                          className="ml-auto px-2.5 py-1 text-[11px] font-bold bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          Stop & Score
                        </button>
                      </div>
                    )}

                    {/* Requesting permission */}
                    {micStatus === 'requesting' && (
                      <div className="text-xs text-slate-600 flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        Requesting microphone permission...
                      </div>
                    )}

                    {/* Score Result */}
                    {micStatus === 'scored' && micScore !== null && (
                      <div className={`p-3 rounded-xl border flex items-center justify-between ${
                        micScore >= 80 ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm text-white ${
                            micScore >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                          }`}>
                            {micScore}%
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">
                              {micScore >= 80 ? '🎉 Superb! Auto driver will understand you!' : '💡 Good try — tap Listen and try once more!'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Pronunciation score based on your recorded speech duration & rhythm.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setMicScore(null); setMicStatus('idle'); setPracticeCardId(null); }}
                          className="p-1.5 text-slate-400 hover:text-slate-700"
                          title="Retry"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Error panel */}
                    {micStatus === 'error' && (
                      <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <p>{micError}</p>
                          <button
                            onClick={() => handleStartPractice(item)}
                            className="px-3 py-1 text-[11px] font-bold bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Demo Test & Close */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <button
                        onClick={() => handleDemoTest(item)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors"
                      >
                        <Zap className="w-3 h-3" />
                        Instant Demo Test (No Mic Needed)
                      </button>
                      <button
                        onClick={handleClosePractice}
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
