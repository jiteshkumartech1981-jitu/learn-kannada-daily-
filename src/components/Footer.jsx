import React from 'react';
import { Heart, Sparkles, Code2, Globe } from 'lucide-react';

export default function Footer({ setActiveMode }) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="h-1 w-full bg-linear-to-r from-yellow-400 via-amber-500 to-red-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                ಕ
              </div>
              <span className="font-extrabold text-base text-slate-900">
                KannadaDaily (ಕನ್ನಡ ದಿನದಿನ)
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Developed for the <strong>Kannada Technology Challenge</strong>. 
              <strong>Track 01 (Language Learning)</strong>
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
            <button onClick={() => setActiveMode('scenarios')} className="hover:text-amber-600 transition-colors">
              Scenarios
            </button>
            <span>•</span>
            <button onClick={() => setActiveMode('flashcards')} className="hover:text-amber-600 transition-colors">
              Flashcards
            </button>
            <span>•</span>
            <button onClick={() => setActiveMode('quiz')} className="hover:text-amber-600 transition-colors">
              Roleplay Quiz
            </button>
            <span>•</span>
            <button onClick={() => setActiveMode('cheatsheet')} className="hover:text-amber-600 transition-colors">
              Cheat-Sheet
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Kannada Nadu & Everyday Life</span>
          </div>
          <span className="font-kannada font-bold text-slate-700">
            ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ!
          </span>
        </div>
      </div>
    </footer>
  );
}
