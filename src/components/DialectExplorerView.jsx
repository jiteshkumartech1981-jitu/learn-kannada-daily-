import React, { useState } from 'react';
import { 
  MapPin, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Compass, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { REGIONS } from '../data/dialects';
import { playKannadaTTS } from '../utils/speech';

export default function DialectExplorerView() {
  const [selectedRegionId, setSelectedRegionId] = useState(REGIONS[0].id);

  const currentRegion = REGIONS.find(r => r.id === selectedRegionId) || REGIONS[0];

  // Cross-regional comparison matrix
  const crossRegionMatrix = [
    {
      concept: 'Why? / What for?',
      standard: 'ಯಾಕೆ? (Yaake?)',
      uttara: 'ಯಾತಕ್ಕ / ಯಾತಕ್ರಿ? (Yaatakka?)',
      karavali: 'ಎಂತಕ್ಕೆ ಮಾರೆ? (Enthakke maare?)',
      mysuru: 'ಯಾಕಪ್ಪ / ಯಾಕಣ್ (Yaakappa?)',
      bengaluru: 'ಯಾಕ್ ಗುರು? (Yaak guru?)'
    },
    {
      concept: 'Superb / Awesome!',
      standard: 'ಚೆನ್ನಾಗಿದೆ (Chennaagide)',
      uttara: 'ಚೊಲೋ ಅದ / ಭಾಳ ಚಂದ (Cholo ada)',
      karavali: 'ಲಾಯಕ್ ಉಂಡು (Laayak undu)',
      mysuru: 'ಖುಷಿ ಆಯ್ತಪ್ಪ (Khushi aaythappa)',
      bengaluru: 'ಸಕ್ಕತ್ ಆಗಿದೆ ಗುರು! (Sakkath!)'
    },
    {
      concept: 'What are you doing?',
      standard: 'ಏನು ಮಾಡುತ್ತಿದ್ದೀಯಾ? (Enu maaduththeedheeya?)',
      uttara: 'ಏನ್ ಮಾಡಾಕತ್ತಿ? (Yen maadaakathhi?)',
      karavali: 'ಎಂತ ಮಲ್ತೊಂದು ಉಲ್ಲಾರ್? (Entha malthondu?)',
      mysuru: 'ಏನ್ ಮಾಡ್ತೀಯಪ್ಪ? (Yen maadtthiyappa?)',
      bengaluru: 'ಏನ್ ಸಮಾಚಾರ ಮಗ? (Yen samaachaara?)'
    },
    {
      concept: 'Friend / Brother',
      standard: 'ಸ್ನೇಹಿತ (Snehitha)',
      uttara: 'ತಮ್ಮಾ / ಅಣ್ಣಾ (Thammaa / Annaa)',
      karavali: 'ಮಾರೆ (Maare)',
      mysuru: 'ಅಪ್ಪ / ಕಣೋ (Appa / Kano)',
      bengaluru: 'ಮಚಾ / ಗುರು (Macha / Guru)'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 via-emerald-600 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="space-y-2">
          <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-xs">
            Challenge 04
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namma Kannada — Regional Language Explorer
          </h1>
          <p className="font-kannada text-lg font-semibold text-teal-100">
            ನಮ್ಮ ಕನ್ನಡ — ಪ್ರಾದೇಶಿಕ ಭಾಷಾ ವೈವಿಧ್ಯತೆ ಮತ್ತು ಸಂಸ್ಕೃತಿ
          </p>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
            Explore authentic regional Kannada dialects: the poetic cadences of Uttara Karnataka, the coastal rhythms of Karavali and Kundapura, the warmth of Old Mysore, and contemporary Bengaluru slang.
          </p>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {REGIONS.map((reg) => {
          const isSelected = reg.id === selectedRegionId;
          return (
            <div
              key={reg.id}
              onClick={() => setSelectedRegionId(reg.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-600'}`} />
                <h3 className="font-bold text-xs uppercase tracking-wider">
                  {reg.name.split('(')[0]}
                </h3>
              </div>
              <div className={`font-kannada font-bold text-sm ${isSelected ? 'text-amber-100' : 'text-slate-900'}`}>
                {reg.kannadaName}
              </div>
              <p className={`text-[11px] mt-1 truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                {reg.regions}
              </p>
            </div>
          );
        })}
      </div>

      {/* Current Region Detail Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Cultural & Linguistic Banner */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {currentRegion.name}
              </h2>
              <p className="font-kannada text-amber-600 font-semibold text-sm">
                {currentRegion.kannadaName}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 self-start sm:self-auto">
              Coverage: {currentRegion.regions}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Linguistic Profile:</span>
              <p className="text-slate-600">{currentRegion.accentDescription}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Cultural Heritage:</span>
              <p className="text-slate-600">{currentRegion.culturalFact}</p>
            </div>
          </div>
        </div>

        {/* Vocabulary & Phrase Dictionary */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Regional Expressions & Vocabulary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRegion.vocabulary.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-white transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Standard Kannada</span>
                    <div className="font-kannada text-sm font-semibold text-slate-600">
                      {item.standard}
                    </div>
                  </div>

                  <button
                    onClick={() => playKannadaTTS(item.dialect.split('(')[0])}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs font-bold transition-colors shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Regional Dialect</span>
                  <div className="font-kannada text-lg font-bold text-slate-900">
                    {item.dialect}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <strong>Meaning:</strong> {item.meaning}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 text-[11px] text-amber-950 font-kannada">
                  <strong>Example:</strong> {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cross-Regional Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Cross-Dialect Matrix (Side-by-Side Comparison)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            See how the same concept shifts across the four corners of Karnataka.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Concept</th>
                <th className="p-3">Standard Kannada</th>
                <th className="p-3 text-emerald-800">Uttara Karnataka</th>
                <th className="p-3 text-cyan-800">Karavali / Coastal</th>
                <th className="p-3 text-amber-800">Hale Mysuru</th>
                <th className="p-3 text-purple-800">Bengaluru Slang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crossRegionMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{row.concept}</td>
                  <td className="p-3 font-kannada text-slate-700">{row.standard}</td>
                  <td className="p-3 font-kannada font-semibold text-emerald-700">{row.uttara}</td>
                  <td className="p-3 font-kannada font-semibold text-cyan-700">{row.karavali}</td>
                  <td className="p-3 font-kannada font-semibold text-amber-700">{row.mysuru}</td>
                  <td className="p-3 font-kannada font-semibold text-purple-700">{row.bengaluru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
