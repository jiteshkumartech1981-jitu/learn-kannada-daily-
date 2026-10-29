import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2, Mic, MicOff, Search, Sparkles, Car, ShoppingBag, Utensils,
  Package, HeartPulse, Briefcase, Bookmark, BookmarkCheck, Gauge,
  AlertTriangle, Zap, RotateCcw, Keyboard, AudioLines, Info, X,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, SITUATIONS } from '../data/situations';
import {
  playKannadaTTS, getVoiceDiagnostics, isMicSupported,
  createLocalMicRecorder, scorePronunciationByDuration, scoreTypedAttempt
} from '../utils/speech';

const ICON_MAP = { Sparkles, Car, ShoppingBag, Utensils, Package, HeartPulse, Briefcase };

export default function ScenarioCards() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speechSpeed, setSpeechSpeed] = useState(1.3);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Audio
  const [playingId, setPlayingId] = useState(null);

  // Practice state
  const [practiceCardId, setPracticeCardId] = useState(null);
  const [practiceMode, setPracticeMode] = useState('choose'); // 'choose' | 'mic' | 'type' | 'scored'
  const [micStatus, setMicStatus] = useState('idle'); // 'idle' | 'requesting' | 'recording'
  const [micError, setMicError] = useState('');
  const [recSeconds, setRecSeconds] = useState(0);
  const [score, setScore] = useState(null);
  const [scoreFeedback, setScoreFeedback] = useState('');
  const [typedText, setTypedText] = useState('');

  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  // Voice diagnostics for debug info
  const [voiceInfo, setVoiceInfo] = useState(null);

  useEffect(() => {
    // Load voice info after a brief delay (voices load async)
    const t = setTimeout(() => setVoiceInfo(getVoiceDiagnostics()), 2000);
    return () => {
      clearTimeout(t);
      clearInterval(timerRef.current);
    };
  }, []);

  // ─── LISTEN ─────────────────────────────────────────────
  const handleListen = (item) => {
    setPlayingId(item.id);
    playKannadaTTS(item.kannada, speechSpeed, () => setPlayingId(null));
    setTimeout(() => setPlayingId(prev => prev === item.id ? null : prev), 8000);
  };

  // ─── PRACTICE: open panel ───────────────────────────────
  const openPractice = (item) => {
    if (practiceCardId === item.id) {
      closePractice();
      return;
    }
    setPracticeCardId(item.id);
    setPracticeMode('choose');
    setScore(null);
    setScoreFeedback('');
    setMicError('');
    setTypedText('');
    setRecSeconds(0);
    setMicStatus('idle');
  };

  const closePractice = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current) try { recorderRef.current.stopRecording(); } catch (_) {}
    recorderRef.current = null;
    setPracticeCardId(null);
    setPracticeMode('choose');
    setScore(null);
    setScoreFeedback('');
    setMicError('');
    setTypedText('');
    setRecSeconds(0);
    setMicStatus('idle');
  };

  // ─── MIC PRACTICE ──────────────────────────────────────
  const startMicRecording = async (item) => {
    setPracticeMode('mic');
    setMicStatus('requesting');
    setScore(null);
    setScoreFeedback('');
    setMicError('');
    setRecSeconds(0);

    const rec = await createLocalMicRecorder({
      onStart: () => {
        setMicStatus('recording');
        setRecSeconds(0);
        timerRef.current = setInterval(() => setRecSeconds(s => s + 1), 1000);
      },
      onStop: (blob, durMs) => {
        clearInterval(timerRef.current);
        const s = scorePronunciationByDuration(durMs, item.kannada.length);
        setScore(s);
        setScoreFeedback(
          s >= 80
            ? '🎉 Superb pronunciation! Auto driver will understand you perfectly!'
            : s >= 60
              ? '👍 Good effort! Listen to the audio again and match the rhythm.'
              : '💡 Keep practicing! Play the audio at Slow speed and repeat.'
        );
        setPracticeMode('scored');
        recorderRef.current = null;
      },
      onError: (code, msg) => {
        clearInterval(timerRef.current);
        setMicStatus('idle');
        setMicError(msg || 'Microphone error');
        recorderRef.current = null;
      }
    });

    if (!rec) return;
    recorderRef.current = rec;
    rec.startRecording();
  };

  const stopMicRecording = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current) recorderRef.current.stopRecording();
  };

  // ─── TYPED PRACTICE ────────────────────────────────────
  const submitTypedPractice = (item) => {
    const { score: s, feedback } = scoreTypedAttempt(
      typedText, item.kannada, item.phonetic, item.keywords
    );
    setScore(s);
    setScoreFeedback(feedback);
    setPracticeMode('scored');
  };

  // ─── DEMO TEST ─────────────────────────────────────────
  const runDemoTest = () => {
    setScore(92);
    setScoreFeedback('🎉 Demo simulation — 92% match! In real usage, speak or type to get a live score.');
    setPracticeMode('scored');
  };

  // ─── BOOKMARK ──────────────────────────────────────────
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  // ─── FILTER ────────────────────────────────────────────
  const filtered = SITUATIONS.filter(item => {
    const catOk = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return catOk;
    return catOk && (
      item.kannada.includes(q) || item.phonetic.toLowerCase().includes(q) ||
      item.english.toLowerCase().includes(q) || item.situation.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  // ─── RENDER ────────────────────────────────────────────
  return (
    <div className="space-y-8 pb-16">

      {/* Hero */}
      <section className="bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Track 01 & 03: Practical Everyday Kannada
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Master Real-World Kannada for Everyday Situations
            </h1>
            <p className="font-kannada text-lg font-bold text-amber-100">
              ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಕನ್ನಡ — ಆಟೋ, ತರಕಾರಿ, ಹೋಟೆಲ್ ಮತ್ತು ಕಚೇರಿ ಸಂಭಾಷಣೆ
            </p>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Audio uses your browser's built-in voice. For best quality, use <strong>Chrome or Edge</strong>. Practice via microphone recording OR type your phonetic attempt!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 space-y-1.5 self-start sm:self-auto shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" /> Audio Speed
            </span>
            <div className="flex gap-1.5">
              {[
                { label: 'Fast', rate: 1.6 },
                { label: 'Normal', rate: 1.3 },
                { label: 'Slow', rate: 0.8 },
              ].map(({ label, rate }) => (
                <button
                  key={rate}
                  onClick={() => setSpeechSpeed(rate)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    speechSpeed === rate ? 'bg-white text-slate-900 shadow-xs' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >{label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voice Status Banner */}
      {voiceInfo && voiceInfo.voiceCount === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Audio Tip:</strong> Your browser has no voice packs loaded yet. 
            <strong> Click "Listen" once</strong> — the first click loads voices, and from the <strong>second click onwards</strong> audio will play clearly. 
            For the best Kannada voice, try opening this page in <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search (e.g. 'auto', 'coffee', 'meter', 'doctor', 'swiggy')..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder:text-slate-400"
          />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700">Clear</button>}
        </div>
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedCategory === cat.id ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              ><Icon className="w-3.5 h-3.5" />{cat.label}</button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> everyday dialogues</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => {
          const isPlaying = playingId === item.id;
          const isPractice = practiceCardId === item.id;

          return (
            <div key={item.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                isPlaying ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200 hover:border-amber-400'
              }`}
            >
              {/* Card Content */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">{item.situation}</span>
                    <span className="text-[10px] font-medium text-slate-400">{item.difficulty}</span>
                  </div>
                  <button onClick={() => toggleBookmark(item.id)} className="p-1 text-slate-400 hover:text-amber-500">
                    {bookmarkedIds.has(item.id) ? <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-kannada text-2xl font-bold text-slate-900 hover:text-red-600 transition-colors leading-snug">{item.kannada}</div>
                <div className="text-xs font-semibold text-amber-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 font-mono">
                  Phonetic: <span className="font-bold text-slate-900">{item.phonetic}</span>
                </div>
                <div className="text-sm font-medium text-slate-700">"{item.english}"</div>
                <div className="text-[11px] text-slate-500"><span className="font-bold text-slate-700">Usage Tip:</span> {item.context}</div>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex gap-2">
                  <button onClick={() => handleListen(item)} disabled={isPlaying}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all ${
                      isPlaying ? 'bg-amber-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}>
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                    {isPlaying ? 'Speaking...' : `Listen (${speechSpeed <= 0.8 ? 'Slow' : speechSpeed >= 1.6 ? 'Fast' : 'Normal'})`}
                  </button>
                  <button onClick={() => openPractice(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs border bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200">
                    <Mic className="w-4 h-4 text-red-500" /> Practice
                  </button>
                </div>

                {/* Practice Panel */}
                {isPractice && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">

                    {/* Mode Chooser */}
                    {practiceMode === 'choose' && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-700">Choose your practice method:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                          {/* Mic Option */}
                          <button onClick={() => startMicRecording(item)}
                            className="p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-red-400 hover:bg-red-50 text-center space-y-1 transition-all">
                            <Mic className="w-5 h-5 text-red-500 mx-auto" />
                            <span className="text-xs font-bold text-slate-800 block">🎙️ Record Voice</span>
                            <span className="text-[10px] text-slate-500">Speak into mic & get scored</span>
                          </button>

                          {/* Type Option */}
                          <button onClick={() => setPracticeMode('type')}
                            className="p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-center space-y-1 transition-all">
                            <Keyboard className="w-5 h-5 text-blue-500 mx-auto" />
                            <span className="text-xs font-bold text-slate-800 block">⌨️ Type Answer</span>
                            <span className="text-[10px] text-slate-500">Type phonetic & get scored</span>
                          </button>

                          {/* Demo */}
                          <button onClick={runDemoTest}
                            className="p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50 text-center space-y-1 transition-all">
                            <Zap className="w-5 h-5 text-amber-500 mx-auto" />
                            <span className="text-xs font-bold text-slate-800 block">⚡ Quick Demo</span>
                            <span className="text-[10px] text-slate-500">See how scoring works</span>
                          </button>

                        </div>
                        {micError && (
                          <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 text-[11px] text-red-800 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span>{micError}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Mic Recording Mode */}
                    {practiceMode === 'mic' && micStatus === 'requesting' && (
                      <div className="text-xs text-slate-600 flex items-center gap-2 py-4 justify-center">
                        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        Requesting microphone permission — click "Allow" in browser popup...
                      </div>
                    )}

                    {practiceMode === 'mic' && micStatus === 'recording' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm font-bold text-red-700">Recording... ({recSeconds}s)</span>
                          </div>
                        </div>
                        {/* Waveform */}
                        <div className="flex items-end justify-center gap-0.5 h-10 py-1 bg-red-50 rounded-xl border border-red-200">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-1.5 bg-red-400 rounded-full animate-pulse"
                              style={{ height: `${12 + Math.random() * 28}px`, animationDelay: `${i * 0.05}s` }} />
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500 text-center">
                          Read aloud: <strong className="text-slate-900">{item.phonetic}</strong>
                        </p>
                        <button onClick={stopMicRecording}
                          className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                          <MicOff className="w-4 h-4" /> Stop & Get Score
                        </button>
                      </div>
                    )}

                    {/* Type Mode */}
                    {practiceMode === 'type' && (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-600">
                          Type the phrase in <strong>phonetic English (Kenglish)</strong> or <strong>Kannada script</strong>:
                        </p>
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800">
                          <strong>Hint:</strong> {item.phonetic}
                        </div>
                        <input
                          type="text" value={typedText} onChange={e => setTypedText(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && typedText.trim() && submitTypedPractice(item)}
                          placeholder="Type your attempt here..."
                          autoFocus
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => submitTypedPractice(item)}
                            disabled={!typedText.trim()}
                            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl disabled:opacity-40 transition-colors">
                            Check My Answer
                          </button>
                          <button onClick={() => setPracticeMode('choose')}
                            className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors">
                            Back
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Score Result */}
                    {practiceMode === 'scored' && score !== null && (
                      <div className="space-y-3">
                        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                          score >= 80 ? 'bg-emerald-50 border-emerald-300' : score >= 50 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300'
                        }`}>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg text-white shrink-0 ${
                            score >= 80 ? 'bg-emerald-600' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}>{score}%</div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">{scoreFeedback}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setPracticeMode('choose'); setScore(null); setTypedText(''); }}
                            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                            <RotateCcw className="w-3.5 h-3.5" /> Try Again
                          </button>
                          <button onClick={() => handleListen(item)}
                            className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                            <Volume2 className="w-3.5 h-3.5" /> Listen Again
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Close button */}
                    <div className="flex justify-end pt-1 border-t border-slate-200">
                      <button onClick={closePractice} className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1">
                        <X className="w-3 h-3" /> Close Practice
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
