/**
 * VORTEX AI — Core Application Layout
 * "Know What Changed. Know Why It Matters."
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CompanyDetailModal } from './components/CompanyDetailModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ResearchPage } from './pages/ResearchPage';
import { VortexAiPage } from './pages/VortexAiPage';
import { ThesisPage } from './pages/ThesisPage';
import { AlertsPage } from './pages/AlertsPage';
import { WhatIfPage } from './pages/WhatIfPage';
import { SettingsPage } from './pages/SettingsPage';

const MainLayout: React.FC = () => {
  const { currentPage, selectedCompanySymbol, setSelectedCompanySymbol } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // If on landing page, render clean full-screen landing view
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'research':
        return <ResearchPage />;
      case 'vortex-ai':
        return <VortexAiPage />;
      case 'thesis':
        return <ThesisPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'what-if':
        return <WhatIfPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0E14] text-slate-100 overflow-hidden select-none font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative z-10 w-64 h-full bg-[#0F141E]">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Terminal Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto bg-[#0B0E14] scroll-smooth">
          {renderActivePage()}
        </main>
      </div>

      {/* Deep Research Modal */}
      <CompanyDetailModal
        symbol={selectedCompanySymbol}
        onClose={() => setSelectedCompanySymbol(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
