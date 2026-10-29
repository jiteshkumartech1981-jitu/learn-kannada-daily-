import React from 'react';
import { Heart, Sparkles, Code2, Globe } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="h-1 w-full bg-linear-to-r from-yellow-400 via-amber-500 to-red-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold">
                ಕ
              </div>
              <span className="font-extrabold text-base text-slate-900">
                KannadaSetu (ಕನ್ನಡ ಸೇತು)
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Unified technology platform built for the <strong>Kannada Technology Challenge</strong> hackathon. Bridging modern AI tools with Kannada language, rich regional dialects, everyday resident needs, and tourism.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for Kannada Nadu & NuDi</span>
            </div>
          </div>

          {/* Six Tracks Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Challenge Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('learn')} className="hover:text-amber-600 transition-colors">
                  01 & 03: Everyday Scenarios
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('voice')} className="hover:text-amber-600 transition-colors">
                  02: Voice of Kannada
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dialects')} className="hover:text-amber-600 transition-colors">
                  04: Regional Dialect Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ocr')} className="hover:text-amber-600 transition-colors">
                  05: Kannada Lens OCR
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('travel')} className="hover:text-amber-600 transition-colors">
                  06: AI Travel Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Hackathon Stack */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Built With
            </h4>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>• React 19 + Vite 6</li>
              <li>• Tailwind CSS v4</li>
              <li>• Web Speech API (kn-IN)</li>
              <li>• Tesseract OCR Engine</li>
              <li>• Noto Sans Kannada Typography</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 KannadaSetu • Open-source Hackathon Submission.</p>
          <div className="flex items-center gap-4">
            <span className="font-kannada font-bold text-slate-800">ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
