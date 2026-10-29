import React, { useState } from 'react';
import { 
  RotateCw, 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  Shuffle, 
  CheckCircle2, 
  Bookmark,
  Sparkles
} from 'lucide-react';
import { SITUATIONS } from '../data/situations';
import { playKannadaTTS } from '../utils/speech';

export default function FlashcardMode() {
  const [deck, setDeck] = useState(SITUATIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const currentCard = deck[currentIndex] || deck[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleMastered = () => {
    setMasteredCount(prev => prev + 1);
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">
          Guided Practice
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Everyday Kannada Flashcards
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Tap the card to reveal the Kannada script, phonetic pronunciation, and audio.
        </p>
      </div>

      {/* Progress & Controls Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
        <span>
          Card {currentIndex + 1} of {deck.length}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {masteredCount} Mastered
          </span>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle Deck</span>
          </button>
        </div>
      </div>

      {/* Flashcard Component */}
      <div
        onClick={() => {
          setIsFlipped(!isFlipped);
          if (!isFlipped) {
            playKannadaTTS(currentCard.kannada);
          }
        }}
        className="relative min-h-80 sm:min-h-96 rounded-3xl bg-white border-2 border-amber-300 p-8 sm:p-12 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between items-center text-center select-none group"
      >
        <div className="w-full flex items-center justify-between text-xs text-slate-400">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase tracking-wider text-[10px]">
            {currentCard.situation}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-400 group-hover:text-amber-600">
            <RotateCw className="w-3.5 h-3.5" /> Tap to flip
          </span>
        </div>

        {/* Card Face */}
        {!isFlipped ? (
          /* FRONT: English scenario */
          <div className="space-y-4 my-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              How would you say this in Kannada?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              "{currentCard.english}"
            </h3>
            <p className="text-xs text-slate-500 italic max-w-md mx-auto">
              Context: {currentCard.context}
            </p>
          </div>
        ) : (
          /* BACK: Kannada, Phonetic, and Audio */
          <div className="space-y-4 my-auto animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              In Real-World Kannada
            </span>
            <div className="font-kannada text-3xl sm:text-4xl font-extrabold text-slate-900 leading-normal">
              {currentCard.kannada}
            </div>
            <div className="text-sm font-bold text-amber-800 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 font-mono inline-block">
              {currentCard.phonetic}
            </div>
            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playKannadaTTS(currentCard.kannada);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Audio Again</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-[11px] text-slate-400">
          Difficulty: <strong>{currentCard.difficulty}</strong>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleMastered}
          className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>I Knew This</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
