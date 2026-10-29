import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Mic, 
  Map, 
  ScanText, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Languages,
  Headphones,
  Award
} from 'lucide-react';
import { playKannadaTTS } from '../utils/speech';

export default function HomeView({ setActiveTab }) {
  const challengeModules = [
    {
      id: 'learn',
      number: '01 & 03',
      title: 'Kannada for Everyone & Everyday Life',
      kannada: 'ಪ್ರತಿದಿನದ ಕನ್ನಡ ಮತ್ತು ಕಲಿಕೆ',
      category: 'Language Learning & Practical Application',
      description: 'Master real-life situational Kannada for auto rickshaws, grocery markets, hospitals, BMTC transport, and office banters with interactive flashcards and audio.',
      features: ['25+ Situational dialogues', 'English transliteration (Kenglish)', 'Interactive quizzes with instant scoring'],
      icon: BookOpen,
      gradient: 'from-amber-500 to-yellow-600',
      badge: 'Tracks 01 + 03'
    },
    {
      id: 'voice',
      number: '02',
      title: 'Voice of Kannada (Speech AI Coach)',
      kannada: 'ಕನ್ನಡ ಧ್ವನಿ ಸಹಾಯಕ',
      category: 'Voice & Speech Processing',
      description: 'Speak in Kannada via microphone, receive real-time speech-to-text recognition, pronunciation match scores, and phonetic tips to speak like a native.',
      features: ['Web Speech Recognition (kn-IN)', 'Pronunciation score engine', 'Beginner to tongue-twister levels'],
      icon: Mic,
      gradient: 'from-red-500 to-rose-600',
      badge: 'Track 02'
    },
    {
      id: 'dialects',
      number: '04',
      title: 'Namma Kannada — Regional Explorer',
      kannada: 'ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ವೈವಿಧ್ಯತೆ',
      category: 'Culture & Heritage Preservation',
      description: 'Explore the authentic accents, words, and expressions across Uttara Karnataka, Coastal Karavali/Kundapura, Hale Mysuru, and Bengaluru street slang.',
      features: ['4 Unique cultural dialect zones', 'Comparative standard vs dialect table', 'Audio pronunciation & cultural trivia'],
      icon: Map,
      gradient: 'from-teal-600 to-emerald-600',
      badge: 'Track 04'
    },
    {
      id: 'ocr',
      number: '05',
      title: 'Kannada Text Digitization (Lens AI)',
      kannada: 'ಕನ್ನಡ ಅಕ್ಷರ ಗುರುತಿಸುವಿಕೆ (OCR)',
      category: 'Document AI & Optical Character Recognition',
      description: 'Convert Kannada text from street signboards, bus route boards, and documents into searchable digital text with instant English translation and audio reading.',
      features: ['Instant OCR image extraction', 'Preset real-world test cases', 'One-click copy & speech synthesis'],
      icon: ScanText,
      gradient: 'from-blue-600 to-indigo-600',
      badge: 'Track 05'
    },
    {
      id: 'travel',
      number: '06',
      title: 'AI Travel Planner for Karnataka',
      kannada: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ',
      category: 'Travel & Tourism Tech',
      description: 'Generate personalized day-by-day itineraries across Karnataka (Hampi, Coorg, Gokarna, Mysuru) paired with local culinary picks and destination-specific Kannada phrasebooks.',
      features: ['Multi-day curated itineraries', 'Budget tiers & secret spots', 'Localized travel Kannada phrasebook'],
      icon: Compass,
      gradient: 'from-purple-600 to-violet-700',
      badge: 'Track 06'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-amber-50 via-white to-red-50/40 border border-amber-200/70 p-8 sm:p-12 shadow-sm">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Kannada Technology Challenge Solution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bridging Language, Culture & Everyday Life in Karnataka
          </h1>

          <p className="font-kannada text-xl sm:text-2xl font-bold text-red-600">
            ಕನ್ನಡ ನಾಡು, ನುಡಿ ಮತ್ತು ತಂತ್ರಜ್ಞಾನದ ಸುಂದರ ಸಮಾಗಮ
          </p>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A comprehensive, all-in-one AI platform addressing all <strong>six problem statements</strong>: from everyday conversation practice and voice pronunciation, to regional dialect discovery, document OCR, and cultural travel planning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('learn')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-amber-500 to-red-600 text-white font-bold text-sm shadow-md hover:from-amber-600 hover:to-red-700 transition-all hover:scale-[1.02]"
            >
              <span>Explore Everyday Kannada</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-800 border border-slate-300 font-semibold text-sm hover:bg-slate-50 transition-all shadow-xs"
            >
              <Mic className="w-4 h-4 text-red-600" />
              <span>Test Voice Coach</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 border-t border-amber-200/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
              <div className="text-2xl font-extrabold text-amber-600">6 of 6</div>
              <div className="text-xs text-slate-600 font-medium">Challenge Tracks Solved</div>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
              <div className="text-2xl font-extrabold text-red-600">100%</div>
              <div className="text-xs text-slate-600 font-medium">In-Browser Speech & OCR</div>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
              <div className="text-2xl font-extrabold text-emerald-600">4 Zones</div>
              <div className="text-xs text-slate-600 font-medium">Regional Dialects Mapped</div>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
              <div className="text-2xl font-extrabold text-indigo-600">Interactive</div>
              <div className="text-xs text-slate-600 font-medium">Bilingual Audio & Quizzes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Problem Statement Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Problem Statement Implementations
            </h2>
            <p className="text-sm text-slate-500">
              Direct answers to each challenge defined in the challenge brief.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Click any card to launch module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      Challenge {item.number}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-kannada text-sm font-semibold text-slate-700 mt-0.5">
                      {item.kannada}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-amber-600">
                  <span>Open Interactive Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Judging Criteria Alignment Banner */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Hackathon Alignment & Pitch Value</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1.5">
            <h4 className="font-bold text-sm text-white">Social & Cultural Impact</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Empowers non-native speakers to integrate easily, shop and travel confidently, while preserving rare regional Kannada dialects.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-sm text-white">Technical Innovation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Combines Web Speech Recognition (kn-IN), client-side Kannada OCR, algorithmic pronunciation scoring, and generative itinerary synthesis.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-sm text-white">Complete & Ready Demo</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every track has functioning interactive controls, real audio playback, instant quizzes, and preset test data for live judging.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
