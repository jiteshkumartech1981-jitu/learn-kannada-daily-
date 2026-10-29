import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  BookOpen, 
  Layers, 
  Award, 
  FileText,
  Search,
  CheckCircle2
} from 'lucide-react';
import { playKannadaTTS } from '../utils/speech';

export default function Header({ activeMode, setActiveMode, scenarioCount }) {
  const modes = [
    { id: 'scenarios', label: 'Real-Life Scenarios', icon: BookOpen, count: `${scenarioCount} Dialogues` },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, count: 'Interactive Deck' },
    { id: 'quiz', label: 'Roleplay Quiz', icon: Award, count: '5 Challenges' },
    { id: 'cheatsheet', label: 'Quick Cheat-Sheet', icon: FileText, count: 'Everyday Words' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Karnataka flag gradient accent line */}
      <div className="h-1.5 w-full bg-linear-to-r from-yellow-400 via-amber-500 to-red-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              ಕ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  KannadaDaily
                </span>
                <span className="font-kannada font-bold text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  ಕನ್ನಡ ದಿನದಿನ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Track 01: Kannada for Everyday Life
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Greeting & Track Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => playKannadaTTS('ನಮಸ್ಕಾರ, ಕನ್ನಡ ಕಲಿಯಿರಿ!')}
              title="Hear Welcome in Kannada"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">ನಮಸ್ಕಾರ</span>
            </button>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-white rounded-md shadow-xs hidden sm:inline">
              Tracks 01 + 03
            </span>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

