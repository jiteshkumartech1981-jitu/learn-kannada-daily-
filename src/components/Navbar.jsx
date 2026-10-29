import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Mic, 
  Map, 
  ScanText, 
  Compass, 
  LayoutDashboard,
  Volume2
} from 'lucide-react';
import { playKannadaTTS } from '../utils/speech';

export const NAV_ITEMS = [
  { id: 'home', label: 'Overview', icon: LayoutDashboard, badge: 'All 6 Tracks' },
  { id: 'learn', label: 'Everyday Kannada', icon: BookOpen, badge: 'Tracks 01 & 03' },
  { id: 'voice', label: 'Voice AI Coach', icon: Mic, badge: 'Track 02' },
  { id: 'dialects', label: 'Regional Explorer', icon: Map, badge: 'Track 04' },
  { id: 'ocr', label: 'Kannada Lens OCR', icon: ScanText, badge: 'Track 05' },
  { id: 'travel', label: 'AI Travel Planner', icon: Compass, badge: 'Track 06' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const playGreeting = () => {
    playKannadaTTS('ನಮಸ್ಕಾರ! ಕನ್ನಡ ಸೇತು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಸ್ವಾಗತ.');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Karnataka flag gradient accent line */}
      <div className="h-1.5 w-full bg-linear-to-r from-yellow-400 via-amber-500 to-red-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              ಕ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  KannadaSetu
                </span>
                <span className="font-kannada font-bold text-sm text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  ಕನ್ನಡ ಸೇತು
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Kannada Technology Challenge Platform
              </p>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Audio Test & Tag */}
          <div className="flex items-center gap-2">
            <button
              onClick={playGreeting}
              title="Hear Welcome in Kannada"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">ನಮಸ್ಕಾರ</span>
            </button>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-linear-to-r from-red-600 to-amber-500 text-white rounded-md shadow-xs">
              Hackathon MVP
            </span>
          </div>

        </div>

        {/* Mobile Submenu Scrolling */}
        <div className="lg:hidden flex overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
