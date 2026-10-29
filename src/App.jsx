import React, { useState } from 'react';
import Header from './components/Header';
import ScenarioCards from './components/ScenarioCards';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import CheatSheetMode from './components/CheatSheetMode';
import Footer from './components/Footer';
import { SITUATIONS } from './data/situations';

export default function App() {
  const [activeMode, setActiveMode] = useState('scenarios'); // 'scenarios' | 'flashcards' | 'quiz' | 'cheatsheet'

  const renderActiveMode = () => {
    switch (activeMode) {
      case 'scenarios':
        return <ScenarioCards />;
      case 'flashcards':
        return <FlashcardMode />;
      case 'quiz':
        return <QuizMode />;
      case 'cheatsheet':
        return <CheatSheetMode />;
      default:
        return <ScenarioCards />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-900">
      <Header 
        activeMode={activeMode} 
        setActiveMode={setActiveMode} 
        scenarioCount={SITUATIONS.length} 
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActiveMode()}
      </main>

      <Footer setActiveMode={setActiveMode} />
    </div>
  );
}
