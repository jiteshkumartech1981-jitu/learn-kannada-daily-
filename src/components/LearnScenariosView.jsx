import React, { useState } from 'react';
import { 
  Car, 
  ShoppingBag, 
  Utensils, 
  HeartPulse, 
  Briefcase, 
  Volume2, 
  Check, 
  HelpCircle, 
  Award, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SITUATIONS } from '../data/situations';
import { playKannadaTTS } from '../utils/speech';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Car: Car,
  ShoppingBag: ShoppingBag,
  Utensils: Utensils,
  HeartPulse: HeartPulse,
  Briefcase: Briefcase
};

export default function LearnScenariosView({ setActiveTab }) {
  const [selectedSituationId, setSelectedSituationId] = useState(SITUATIONS[0].id);
  const [activeTabMode, setActiveTabMode] = useState('phrases'); // 'phrases' | 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const currentSituation = SITUATIONS.find(s => s.id === selectedSituationId) || SITUATIONS[0];

  const handleOptionSelect = (qIdx, optIdx) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    currentSituation.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);

    if (score === currentSituation.quiz.length) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleQuizReset = () => {
    setQuizAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-linear-to-r from-amber-500 to-yellow-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-xs">
              Challenges 01 & 03
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kannada for Everyone & Everyday Situations
            </h1>
            <p className="font-kannada text-lg font-semibold text-amber-100">
              ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಕನ್ನಡ — ಆಟೋ, ಮಾರುಕಟ್ಟೆ, ಹೋಟೆಲ್ ಮತ್ತು ಕಚೇರಿ ಸಂಭಾಷಣೆ
            </p>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
              Practical phrases with phonetic transliterations (Kenglish), audio pronunciations, and scenario quizzes to thrive in Karnataka without language barriers.
            </p>
          </div>
        </div>
      </div>

      {/* Situation Selector Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
        {SITUATIONS.map((sit) => {
          const Icon = ICON_MAP[sit.icon] || Car;
          const isSelected = sit.id === selectedSituationId;
          return (
            <button
              key={sit.id}
              onClick={() => {
                setSelectedSituationId(sit.id);
                handleQuizReset();
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sit.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Situation Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Situation Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {currentSituation.title}
            </h2>
            <p className="font-kannada text-amber-600 font-semibold text-sm">
              {currentSituation.kannadaTitle}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentSituation.description}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTabMode('phrases')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTabMode === 'phrases'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dialogues ({currentSituation.phrases.length})
            </button>
            <button
              onClick={() => setActiveTabMode('quiz')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTabMode === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practice Quiz ({currentSituation.quiz.length})
            </button>
          </div>
        </div>

        {/* Phrases List */}
        {activeTabMode === 'phrases' && (
          <div className="space-y-4">
            {currentSituation.phrases.map((phrase, idx) => (
              <div
                key={phrase.id}
                className="group p-5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {phrase.category}
                    </span>
                    <span className="text-xs text-slate-400 italic">
                      — {phrase.context}
                    </span>
                  </div>

                  {/* Kannada Script */}
                  <div className="font-kannada text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {phrase.kannada}
                  </div>

                  {/* Transliteration */}
                  <div className="text-xs font-medium text-amber-700">
                    Phonetic: <span className="font-semibold text-slate-800">{phrase.transliteration}</span>
                  </div>

                  {/* English Translation */}
                  <div className="text-sm text-slate-600">
                    "{phrase.english}"
                  </div>
                </div>

                {/* Audio & Practice Controls */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button
                    onClick={() => playKannadaTTS(phrase.kannada)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('voice')}
                    title="Practice in Voice AI Coach"
                    className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Practice Voice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Practice Quiz */}
        {activeTabMode === 'quiz' && (
          <div className="space-y-6">
            {currentSituation.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isSubmitted = quizScore !== null;
              return (
                <div key={qIdx} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                      {qIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';

                      if (isSelected) {
                        btnStyle = 'bg-amber-500 text-white border-amber-600';
                      }

                      if (isSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                        } else if (isSelected && optIdx !== q.correct) {
                          btnStyle = 'bg-rose-500 text-white border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleOptionSelect(qIdx, optIdx)}
                          className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quiz Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              {quizScore !== null ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">
                    Your Score: {quizScore} / {currentSituation.quiz.length}
                  </span>
                  <button
                    onClick={handleQuizReset}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-red-600 text-white font-bold text-xs shadow-md hover:from-amber-600 hover:to-red-700 disabled:opacity-50 transition-all"
                >
                  Submit Answers
                </button>
              )}

              <div className="text-xs text-slate-500">
                Completed questions unlock points and badge progress.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
