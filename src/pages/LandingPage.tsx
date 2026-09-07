import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  GitFork,
  Activity,
  ScrollText,
  Radio,
  Layers,
  CheckCircle,
  BarChart3,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, marketPulse, dataSource } = useApp();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <nav className="border-b border-[#1E2638] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-black text-lg">
            V
          </div>
          <div>
            <span className="font-extrabold text-white text-lg tracking-wide">VORTEX</span>
            <span className="text-xs font-bold ml-1 px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
              AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#141A26] border border-[#1E2638]">
            <span className={`w-2 h-2 rounded-full ${dataSource === 'LIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">Indian Equities Terminal</span>
          </div>
          <button
            id="btn-landing-enter"
            onClick={() => setCurrentPage('dashboard')}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20"
          >
            <span>Launch Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-20 w-full flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Equity Intelligence</span>
        </div>

        {/* Hero Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Know What Changed.{' '}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Know Why It Matters.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          VORTEX AI connects Indian equity market movements, corporate developments, portfolio exposure, and fundamental investment theses into actionable decision intelligence.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            id="hero-cta-enter"
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-500/25 hover:scale-[1.02]"
          >
            <span>Enter VORTEX Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-cta-demo"
            onClick={() => setCurrentPage('vortex-ai')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#161D2B] hover:bg-[#1E2638] text-white border border-[#263147] font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Consult AI Analyst</span>
          </button>
        </div>

        {/* The Core Paradigm Comparison */}
        <div className="w-full max-w-5xl rounded-2xl bg-[#111622] border border-[#1E2638] p-6 md:p-8 mb-16 text-left shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">
              The VORTEX Difference
            </h2>
            <h3 className="text-2xl font-extrabold text-white">
              Why Traditional Market Dashboards Leave Investors Blind
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional way */}
            <div className="p-5 rounded-xl bg-[#0B0E14] border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Traditional Market Software</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bombards investors with raw prices, candlestick charts, and disconnected news feeds. Leaves the investor entirely on their own to connect the dots.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 pt-2">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Raw Data</span>
                <span>→</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Price Charts</span>
                <span>→</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Noise</span>
              </div>
            </div>

            {/* VORTEX way */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-500/10 via-[#141A26] to-[#141A26] border border-sky-500/30 space-y-4 shadow-lg shadow-sky-500/5">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>VORTEX Decision Intelligence</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Connects real market price action directly to company earnings pillars, portfolio factor exposure, and explicitly tells you if your investment thesis broke.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-sky-300 pt-2">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40">1. What Changed</span>
                <span>↓</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40">2. Why It Matters</span>
                <span>↓</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40">3. Thesis Impact</span>
                <span>↓</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40">4. Watch Next</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl text-left mb-12">
          <div
            onClick={() => setCurrentPage('portfolio')}
            className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
              Portfolio Intelligence
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Real-time P&L, sector weights, hidden factor correlations, and capital concentration risk.
            </p>
          </div>

          <div
            onClick={() => setCurrentPage('thesis')}
            className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <ScrollText className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
              Thesis Pillar Tracker
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Track multi-pillar investment theses with dynamic health scores and automated thesis break alerts.
            </p>
          </div>

          <div
            onClick={() => setCurrentPage('what-if')}
            className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-3">
              <GitFork className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
              What-If Stress Testing
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Mathematical scenario simulations: crude spikes, banking drawdowns, and interest rate shifts.
            </p>
          </div>

          <div
            onClick={() => setCurrentPage('settings')}
            className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
              <Radio className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
              Upstox API V3 Ready
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Seamlessly toggle between verified Indian equity live feeds and offline demo intelligence.
            </p>
          </div>
        </div>

        {/* Live Universe Bar */}
        <div className="w-full max-w-5xl p-4 rounded-xl bg-[#0F141E] border border-[#1E2638] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-slate-300">15 Institutional Indian Equities Monitored:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono font-medium text-slate-300">
            <span>RELIANCE</span> • <span>HDFCBANK</span> • <span>ICICIBANK</span> • <span>SBIN</span> • <span>TCS</span> • <span>INFY</span> • <span>BHARTIARTL</span> • <span>LT</span> • <span>ITC</span> • <span>TATAMOTORS</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2638] px-6 py-6 text-center text-xs text-slate-500">
        <p>VORTEX AI • Indian Equity Investment Intelligence Terminal</p>
        <p className="text-[11px] text-slate-600 mt-1">Designed by SynarkaCore</p>
      </footer>
    </div>
  );
};
