import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Bot,
  ScrollText,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThesisBreakBanner } from '../components/ThesisBreakBanner';

export const DashboardPage: React.FC = () => {
  const {
    portfolioStats,
    marketPulse,
    whatChangedEvents,
    setCurrentPage,
    setSelectedCompanySymbol,
    alerts,
    dataSource,
    isLiveStreaming,
    openAiWithPrompt
  } = useApp();

  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH');

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Greeting & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Portfolio Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time synthesis of market movements, portfolio sensitivities, and thesis integrity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-dash-ask-ai"
            onClick={() => setCurrentPage('vortex-ai')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20"
          >
            <Bot className="w-4 h-4" />
            <span>Ask VORTEX AI</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Portfolio Value */}
        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Portfolio Value
          </span>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              ₹{portfolioStats.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
              Inv: ₹{(portfolioStats.investedValue / 100000).toFixed(2)} Lakh
            </div>
          </div>
        </div>

        {/* Today's P&L */}
        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Today's P&L
          </span>
          <div className="mt-2">
            <div
              className={`text-xl sm:text-2xl font-mono font-extrabold flex items-center gap-1 ${
                portfolioStats.dayPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{portfolioStats.dayPnl >= 0 ? '+' : ''}</span>
              <span>₹{Math.abs(portfolioStats.dayPnl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div
              className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${
                portfolioStats.dayPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {portfolioStats.dayPnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{portfolioStats.dayPnlPercent >= 0 ? '+' : ''}{portfolioStats.dayPnlPercent.toFixed(2)}% today</span>
            </div>
          </div>
        </div>

        {/* Overall Return */}
        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Return
          </span>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">
              +₹{portfolioStats.totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
              +{portfolioStats.totalGainPercent.toFixed(2)}% absolute
            </div>
          </div>
        </div>

        {/* Thesis Health Score */}
        <div
          onClick={() => setCurrentPage('thesis')}
          className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/50 cursor-pointer flex flex-col justify-between transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Thesis Health
            </span>
            <ScrollText className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">
              {portfolioStats.thesisHealthAverage} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
            <div className="text-[11px] text-amber-400 font-medium mt-0.5 flex items-center gap-1">
              <span>1 Warning Flagged</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div
          onClick={() => setCurrentPage('alerts')}
          className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-rose-500/50 cursor-pointer col-span-2 lg:col-span-1 flex flex-col justify-between transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Alerts
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              {alerts.length}
            </div>
            <div className="text-[11px] text-rose-400 font-semibold mt-0.5">
              {criticalAlerts.length} High / Critical
            </div>
          </div>
        </div>
      </div>

      {/* Thesis Break Detector Banner */}
      <ThesisBreakBanner />

      {/* Primary VORTEX AI Insight Card */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-[#141A26] to-[#111622] p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>VORTEX Intelligence Synthesis</span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">
                {marketPulse.lastUpdated}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Sector Rotation: Infrastructure & Telecom Offsetting Sticky Bank Margins
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your portfolio gained resilience today despite HDFC Bank declining -0.94%. Capital mobilization into Bharti Airtel (+1.53%) and Larsen & Toubro (+0.76%) generated +₹2,783 in offset. Factor sensitivity to banking remains high at 37.8% of portfolio NAV.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('vortex-ai')}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20"
            >
              <span>Explain Portfolio Movement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage('what-if')}
              className="px-4 py-2.5 rounded-xl bg-[#1A2234] hover:bg-[#222C44] text-slate-200 border border-[#2E3C56] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Stress-Test Exposure</span>
            </button>
          </div>
        </div>
      </div>

      {/* What Changed Today (Institutional Event Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-400" />
              What Changed Today
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified corporate disclosures, sector rotations, and their direct transmission into your portfolio.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {whatChangedEvents.length} Events Analyzed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatChangedEvents.map(event => (
            <div
              key={event.id}
              className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Event header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-extrabold text-sm text-white group-hover:text-sky-300 transition-colors">
                      {event.symbol}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1.5">
                      {event.companyName}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      event.sentiment === 'POSITIVE'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : event.sentiment === 'NEGATIVE'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {event.confidence} Confidence
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 mb-2 leading-snug">
                  {event.title}
                </h4>

                {/* What Changed */}
                <div className="space-y-2 text-xs">
                  <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-[#1E2638]/70">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                      What Changed
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {event.whatChanged}
                    </p>
                  </div>

                  {/* Why It Matters */}
                  <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-[#1E2638]/70">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      Why It Matters
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {event.whyItMatters}
                    </p>
                  </div>

                  {/* Portfolio & Thesis impact */}
                  <div className="p-2.5 rounded-lg bg-sky-500/5 border border-sky-500/20">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-0.5">
                      Portfolio & Thesis Impact
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {event.portfolioImpact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-[#1E2638] flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{event.timestamp}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAiWithPrompt(`Analyze the institutional event: "${event.title}" for ${event.symbol} (${event.companyName}), its portfolio transmission, and whether it alters our conviction.`)}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20"
                    title="Ask VORTEX AI about this event"
                  >
                    <Bot className="w-3 h-3" />
                    <span>Ask AI</span>
                  </button>
                  <button
                    onClick={() => setSelectedCompanySymbol(event.symbol)}
                    className="text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
