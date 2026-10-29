import React, { useState } from 'react';
import { 
  Compass, 
  Landmark, 
  Trees, 
  Waves, 
  Crown, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Volume2, 
  MapPin, 
  Utensils, 
  Clock,
  ArrowRight,
  Share2
} from 'lucide-react';
import { TRAVEL_THEMES, DESTINATIONS_DATA } from '../data/travelDestinations';
import { playKannadaTTS } from '../utils/speech';

const THEME_ICONS = {
  heritage: Landmark,
  nature: Trees,
  coastal: Waves,
  royal: Crown
};

export default function TravelPlannerView() {
  const [selectedDestKey, setSelectedDestKey] = useState('hampi');
  const [tripDays, setTripDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState('moderate');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentDest = DESTINATIONS_DATA[selectedDestKey] || DESTINATIONS_DATA.hampi;

  const handleDestinationChange = (key) => {
    setIsGenerating(true);
    setSelectedDestKey(key);
    setTimeout(() => {
      setIsGenerating(false);
    }, 350);
  };

  const filteredDays = currentDest.itinerary.slice(0, tripDays);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-linear-to-r from-purple-700 via-indigo-700 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="space-y-2">
          <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-xs">
            Challenge 06
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Travel Planner for Karnataka
          </h1>
          <p className="font-kannada text-lg font-semibold text-purple-200">
            ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಯೋಜಕ — ಇತಿಹಾಸ, ಪ್ರಕೃತಿ ಮತ್ತು ಕರಾವಳಿ ದರ್ಶನ
          </p>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
            Personalized Karnataka itineraries based on your interests, duration, and budget, complete with local food pairings and regional Kannada travel survival phrases.
          </p>
        </div>
      </div>

      {/* Trip Configuration Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
        
        {/* Step 1: Destination Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 1: Choose Your Destination
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(DESTINATIONS_DATA).map((key) => {
              const dest = DESTINATIONS_DATA[key];
              const Icon = THEME_ICONS[dest.theme] || Landmark;
              const isSelected = key === selectedDestKey;
              return (
                <button
                  key={key}
                  onClick={() => handleDestinationChange(key)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : 'text-amber-600'}`} />
                  <div className="font-bold text-sm">
                    {dest.name}
                  </div>
                  <div className={`font-kannada text-xs font-semibold ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                    {dest.kannadaName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Duration & Budget Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Duration */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Trip Duration</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setTripDays(d)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    tripDays === d
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d} {d === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Budget Preference</span>
            </label>
            <div className="flex gap-2">
              {[
                { id: 'budget', label: 'Budget' },
                { id: 'moderate', label: 'Moderate' },
                { id: 'luxury', label: 'Luxury' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setBudgetTier(tier.id)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    budgetTier === tier.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Generated Itinerary Showcase */}
      <div className="space-y-6">
        
        {/* Destination Overview Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Curated Karnataka Journey</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentDest.name}
              </h2>
              <p className="font-kannada font-bold text-red-600 text-base">
                {currentDest.kannadaName}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-semibold block">Estimated Budget</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mt-1">
                {currentDest.budgetOptions[budgetTier]}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentDest.tagline} • <strong>Best Time:</strong> {currentDest.bestMonths}
          </p>
        </div>

        {/* Day-by-Day Itinerary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDays.map((dayItem) => (
            <div
              key={dayItem.day}
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-amber-500 text-white font-extrabold text-xs">
                    Day 0{dayItem.day}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Full Day Schedule
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">
                  {dayItem.title}
                </h3>

                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {dayItem.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Food Recommendation */}
              <div className="pt-3 border-t border-slate-100 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  <span>Must-Try Local Food</span>
                </div>
                <p className="text-xs text-slate-700">
                  {dayItem.localFood}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Localized Survival Kannada Phrasebook */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Local Kannada Travel Phrasebook for {currentDest.name}
              </h3>
              <p className="text-xs text-slate-500">
                Key phrases tailored specifically for your travel to this region.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md">
              Tap speaker to hear audio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentDest.survivalPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-kannada font-bold text-slate-900 text-base">
                    {phrase.kannada}
                  </div>
                  <button
                    onClick={() => playKannadaTTS(phrase.kannada)}
                    className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors shrink-0"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs font-semibold text-amber-700 font-mono">
                  {phrase.transliteration}
                </div>
                <div className="text-xs text-slate-600 italic">
                  "{phrase.english}"
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
