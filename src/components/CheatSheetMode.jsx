import React from 'react';
import { Volume2, BookMarked, Hash, Compass, HeartHandshake, Clock } from 'lucide-react';
import { playKannadaTTS } from '../utils/speech';

export default function CheatSheetMode() {
  const numbers = [
    { num: '1', kn: 'ಒಂದು', ph: 'Ondu' },
    { num: '2', kn: 'ಎರಡು', ph: 'Eradu' },
    { num: '3', kn: 'ಮೂರು', ph: 'Mooru' },
    { num: '4', kn: 'ನಾಲ್ಕು', ph: 'Naalku' },
    { num: '5', kn: 'ಐದು', ph: 'Aidu' },
    { num: '10', kn: 'ಹತ್ತು', ph: 'Hatthu' },
    { num: '20', kn: 'ಇಪ್ಪತ್ತು', ph: 'Ippatthu' },
    { num: '50', kn: 'ಐವತ್ತು', ph: 'Aivatthu' },
    { num: '100', kn: 'ನೂರು', ph: 'Nooru' },
    { num: '500', kn: 'ಐನೂರು', ph: 'Ainooru' }
  ];

  const directions = [
    { en: 'Right', kn: 'ಬಲಗಡೆ', ph: 'Balagade' },
    { en: 'Left', kn: 'ಎಡಗಡೆ', ph: 'Edagade' },
    { en: 'Straight', kn: 'ನೇರವಾಗಿ', ph: 'Nera-vaagi' },
    { en: 'Stop here', kn: 'ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ', ph: 'Ille nillisi' },
    { en: 'Ahead', kn: 'ಮುಂದೆ', ph: 'Munde' },
    { en: 'Behind / Back', kn: 'ಹಿಂದೆ', ph: 'Hinde' },
    { en: 'Near', kn: 'ಹತ್ತಿರ', ph: 'Hathira' },
    { en: 'Far away', kn: 'ದೂರ', ph: 'Doora' }
  ];

  const courtesyWords = [
    { en: 'Please', kn: 'ದಯವಿಟ್ಟು', ph: 'Dayavittu' },
    { en: 'Thank you', kn: 'ಧನ್ಯವಾದಗಳು', ph: 'Dhanyavaadagalu' },
    { en: 'Yes', kn: 'ಹೌದು', ph: 'Howdu' },
    { en: 'No', kn: 'ಇಲ್ಲ', ph: 'Illa' },
    { en: 'I want', kn: 'ಬೇಕು', ph: 'Beku' },
    { en: 'I do not want', kn: 'ಬೇಡ', ph: 'Beda' },
    { en: 'How much?', kn: 'ಎಷ್ಟು?', ph: 'Eshtu?' },
    { en: 'Is it there?', kn: 'ಇದೆಯಾ?', ph: 'Ideya?' }
  ];

  const timeWords = [
    { en: 'Today', kn: 'ಇವತ್ತು', ph: 'Ivatthu' },
    { en: 'Tomorrow', kn: 'ನಾಳೆ', ph: 'Naale' },
    { en: 'Yesterday', kn: 'ನಿನ್ನೆ', ph: 'Ninne' },
    { en: 'Morning', kn: 'ಬೆಳಗ್ಗೆ', ph: 'Belagge' },
    { en: 'Afternoon', kn: 'ಮಧ್ಯಾಹ್ನ', ph: 'Madhyaahna' },
    { en: 'Night', kn: 'ರಾತ್ರಿ', ph: 'Raathri' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">
          Quick Lookup
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Daily Survival Cheat-Sheet
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          The essential numbers, directions, and courtesy words every Karnataka resident needs daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Numbers Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Hash className="w-4 h-4 text-amber-600" />
            <span>Essential Numbers (For Auto & Money)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
            {numbers.map((item, idx) => (
              <div
                key={idx}
                onClick={() => playKannadaTTS(item.kn)}
                className="p-3 rounded-xl border border-slate-100 hover:border-amber-300 bg-slate-50/50 hover:bg-amber-50/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-400">{item.num}</span>
                  <div className="font-kannada font-bold text-base text-slate-900">{item.kn}</div>
                  <div className="text-[11px] font-semibold text-amber-800">{item.ph}</div>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Directions & Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Directions & Transit (For Rides & Walking)</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {directions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => playKannadaTTS(item.kn)}
                className="p-3 rounded-xl border border-slate-100 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-500">{item.en}</span>
                  <div className="font-kannada font-bold text-base text-slate-900">{item.kn}</div>
                  <div className="text-[11px] font-semibold text-emerald-800">{item.ph}</div>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Courtesy & Magic Words */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <HeartHandshake className="w-4 h-4 text-red-600" />
            <span>Courtesy & Magic Words</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {courtesyWords.map((item, idx) => (
              <div
                key={idx}
                onClick={() => playKannadaTTS(item.kn)}
                className="p-3 rounded-xl border border-slate-100 hover:border-red-300 bg-slate-50/50 hover:bg-red-50/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-500">{item.en}</span>
                  <div className="font-kannada font-bold text-base text-slate-900">{item.kn}</div>
                  <div className="text-[11px] font-semibold text-red-800">{item.ph}</div>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Time & Days */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Time & Day References</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {timeWords.map((item, idx) => (
              <div
                key={idx}
                onClick={() => playKannadaTTS(item.kn)}
                className="p-3 rounded-xl border border-slate-100 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-500">{item.en}</span>
                  <div className="font-kannada font-bold text-base text-slate-900">{item.kn}</div>
                  <div className="text-[11px] font-semibold text-indigo-800">{item.ph}</div>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
