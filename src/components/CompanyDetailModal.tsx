import React from 'react';
import {
  X,
  Plus,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Layers,
  Activity,
  CheckCircle2,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InteractiveChart } from './InteractiveChart';

interface CompanyDetailModalProps {
  symbol: string | null;
  onClose: () => void;
  onAddToPortfolio?: (symbol: string) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  symbol,
  onClose,
  onAddToPortfolio
}) => {
  const { companies, theses, watchlist, toggleWatchlist } = useApp();

  if (!symbol) return null;

  const company = companies.find(c => c.symbol === symbol);
  if (!company) return null;

  const thesis = theses[symbol];
  const isWatchlisted = watchlist.includes(symbol);

  // Range percentage for 52W High/Low slider
  const rangeSpan = company.fiftyTwoWeekHigh - company.fiftyTwoWeekLow || 1;
  const currentRangePos = Math.max(
    0,
    Math.min(100, ((company.currentPrice - company.fiftyTwoWeekLow) / rangeSpan) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0F141E] border border-[#263147] rounded-2xl w-full max-w-4xl shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2638] bg-[#141A26] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-extrabold text-sm font-mono">
              {company.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">{company.name}</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {company.symbol}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  NSE / BSE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {company.sector} • Market Cap: ₹{company.marketCap}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-watchlist"
              onClick={() => toggleWatchlist(company.symbol)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isWatchlisted
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-[#1C2436] text-slate-300 border-[#263147] hover:text-white'
              }`}
            >
              {isWatchlisted ? '★ Watchlisted' : '☆ Add to Watchlist'}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#1E2638] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Quote Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#141A26] border border-[#1E2638]">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Price
              </span>
              <div className="text-2xl font-mono font-extrabold text-white mt-1">
                ₹{company.currentPrice.toLocaleString('en-IN')}
              </div>
              <div
                className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${
                  company.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {company.dayChangePercent >= 0 ? '+' : ''}
                {company.dayChange} ({company.dayChangePercent}%)
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Volume / Liquidity
              </span>
              <div className="text-xl font-mono font-bold text-slate-200 mt-1">
                {(company.volume / 100000).toFixed(2)} Lakh
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Shares traded today</div>
            </div>

            <div className="col-span-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>52W Low: ₹{company.fiftyTwoWeekLow.toLocaleString('en-IN')}</span>
                <span className="font-semibold text-slate-300">52-Week Range</span>
                <span>52W High: ₹{company.fiftyTwoWeekHigh.toLocaleString('en-IN')}</span>
              </div>
              <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
                <div
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                  style={{ width: `${currentRangePos}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 text-right mt-1 font-mono">
                {currentRangePos.toFixed(0)}% of 52W range
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                Price Action & Historical Volatility
              </h3>
              <span className="text-xs text-slate-400">
                Source: {company.dataSource || 'Upstox V3'}
              </span>
            </div>
            <InteractiveChart
              data={company.chartData}
              symbol={company.symbol}
              height={260}
            />
          </div>

          {/* VORTEX AI Investment Analysis View */}
          <div className="rounded-xl border border-sky-500/30 bg-gradient-to-b from-sky-500/10 via-[#141A26] to-[#141A26] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    VORTEX AI Investment Intelligence
                  </h4>
                  <p className="text-[11px] text-sky-300 font-medium">
                    Evidence-Backed Interpretation • Not Generic AI Chat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Thesis Health:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
                  {company.thesisHealthScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#0B0E14]/70 border border-[#1E2638]">
                <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px] block mb-1">
                  1. What Changed?
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {company.aiAnalysis.whatChanged}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0E14]/70 border border-[#1E2638]">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                  2. Why It Matters?
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {company.aiAnalysis.whyItMatters}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0E14]/70 border border-[#1E2638]">
                <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block mb-1">
                  3. Thesis Impact
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {company.aiAnalysis.thesisImpact}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0E14]/70 border border-[#1E2638]">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                  4. What To Watch Next?
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {company.aiAnalysis.whatToWatch}
                </p>
              </div>
            </div>
          </div>

          {/* Business Overview & Key Drivers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-[#141A26] border border-[#1E2638]">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                Business Overview
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {company.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141A26] border border-[#1E2638]">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Financial Drivers
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {company.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risks & Catalysts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-[#141A26] border border-rose-500/20">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Key Investment Risks
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {company.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#141A26] border border-emerald-500/20">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Upcoming Catalysts
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {company.catalysts.map((cat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Financial Disclaimer */}
          <div className="p-3 rounded-lg bg-[#0B0E14] border border-[#1E2638] text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">Institutional Disclaimer: </span>
            VORTEX AI is an analytical software platform for research and scenario modeling. It does not provide SEBI-registered investment advice or individual investment recommendations. Past performance and thesis scoring do not guarantee future market outcomes.
          </div>
        </div>
      </div>
    </div>
  );
};
