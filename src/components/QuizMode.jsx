import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Volume2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SCENARIO_QUIZZES } from '../data/situations';
import { playKannadaTTS } from '../utils/speech';
import confetti from 'canvas-confetti';

export default function QuizMode() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (quizIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [quizIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    SCENARIO_QUIZZES.forEach((quiz, idx) => {
      if (selectedAnswers[idx] === quiz.correctIndex) {
        currentScore++;
      }
    });

    setScore(currentScore);
    setSubmitted(true);

    if (currentScore === SCENARIO_QUIZZES.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">
          Practical Assessment
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Real-World Scenario Roleplay Quiz
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Test your intuition in practical situations like bargaining with auto drivers, ordering filter coffee, and consulting a doctor.
        </p>
      </div>

      {/* Quiz List */}
      <div className="space-y-6">
        {SCENARIO_QUIZZES.map((quiz, qIdx) => {
          const selectedOption = selectedAnswers[qIdx];
          return (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Situation {qIdx + 1}: {quiz.situation}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  1 Point
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                {quiz.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {quiz.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (isSelected && !submitted) {
                    btnStyle = 'bg-amber-500 text-white border-amber-600 shadow-xs';
                  }

                  if (submitted) {
                    if (optIdx === quiz.correctIndex) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                    } else if (isSelected && optIdx !== quiz.correctIndex) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playKannadaTTS(opt.split('(')[0]);
                        }}
                        className="ml-2 text-slate-400 hover:text-white shrink-0"
                        title="Hear phrase"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </button>
                  );
                })}
              </div>

              {/* Cultural Explanation upon submit */}
              {submitted && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <strong>Cultural Context & Explanation:</strong>
                  <p>{quiz.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        {submitted ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
              {score}/{SCENARIO_QUIZZES.length}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                {score === SCENARIO_QUIZZES.length ? 'Outstanding! ಸ್ಥಳೀಯರಂತೆ ಮಾತನಾಡಿದ್ದೀರಿ! (Spoke like a local!)' : 'Good effort! Practice once more!'}
              </h4>
              <p className="text-xs text-slate-500">
                You scored {score} out of {SCENARIO_QUIZZES.length} questions correctly.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            Answer all 5 questions to receive your score and unlock the local resident badge.
          </div>
        )}

        <div className="flex items-center gap-2">
          {submitted ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              Submit Answers
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
