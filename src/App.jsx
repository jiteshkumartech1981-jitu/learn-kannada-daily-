import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import LearnScenariosView from './components/LearnScenariosView';
import VoiceCoachView from './components/VoiceCoachView';
import DialectExplorerView from './components/DialectExplorerView';
import OcrDigitizerView from './components/OcrDigitizerView';
import TravelPlannerView from './components/TravelPlannerView';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'learn':
        return <LearnScenariosView setActiveTab={setActiveTab} />;
      case 'voice':
        return <VoiceCoachView />;
      case 'dialects':
        return <DialectExplorerView />;
      case 'ocr':
        return <OcrDigitizerView />;
      case 'travel':
        return <TravelPlannerView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderActiveView()}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
