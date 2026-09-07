import React, { useState } from 'react';
import {
  ScrollText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Sparkles,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvestmentThesis, ThesisPillar } from '../types';

export const ThesisPage: React.FC = () => {
  const { theses, holdings, updateThesis, setSelectedCompanySymbol } = useApp();

  const availableSymbols = Object.keys(theses);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(availableSymbols[0] || 'HDFCBANK');

  const thesis: InvestmentThesis | undefined = theses[selectedSymbol];

  const handleScoreChange = (pillarId: string, newScore: number) => {
    if (!thesis) return;
    const updatedPillars = thesis.pillars.map(p => {
      if (p.id === pillarId) {
        let newStatus: ThesisPillar['status'] = 'Stable';
        if (newScore >= 85) newStatus = 'Strong';
        else if (newScore >= 70) newStatus = 'Stable';
        else if (newScore >= 50) newStatus = 'Weakening';
        else newStatus = 'Broken';

        return { ...p, score: newScore, status: newStatus };
      }
      return p;
    });

    const newOverall = Math.round(
      updatedPillars.reduce((acc, p) => acc + (p.score * p.weight) / 100, 0)
    );

    updateThesis(selectedSymbol, {
      ...thesis,
      pillars: updatedPillars,
      healthScore: newOverall,
      lastAssessed: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <ScrollText className="w-3.5 h-3.5" />
            <span>Foundational Conviction Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Investment Thesis Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Evaluate corporate assumptions across operational pillars. Detect thesis breaks before quarterly financial deterioration.
          </p>
        </div>
      </div>

      {/* Holding Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-b border-[#1E2638] no-scrollbar">
        {availableSymbols.map(sym => {
          const t = theses[sym];
          const isSelected = selectedSymbol === sym;
          return (
            <button
              key={sym}
              onClick={() => setSelectedSymbol(sym)}
              className={`px-4 py-2.5 rounded-t-lg font-bold transition-all flex items-center gap-2 shrink-0 border-b-2 ${
                isSelected
                  ? 'bg-[#141A26] text-sky-400 border-sky-400 shadow-sm'
                  : 'text-slate-400 hover:text-white border-transparent hover:bg-[#111622]'
              }`}
            >
              <span>{sym}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  t.healthScore >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {t.healthScore}/100
              </span>
            </button>
          );
        })}
      </div>

      {thesis ? (
        <div className="space-y-6">
          {/* Executive Thesis Summary Card */}
          <div className="bg-[#111622] rounded-2xl border border-[#1E2638] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-white">
                    {thesis.companyName} ({thesis.symbol})
                  </span>
                  <span className="text-xs text-slate-400">• Last Evaluated: {thesis.lastAssessed}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {thesis.thesisStatement}
                </p>
              </div>

              {/* Score Gauge */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Thesis Health
                  </span>
                  <div
                    className={`text-3xl font-black font-mono mt-0.5 ${
                      thesis.healthScore >= 85
                        ? 'text-emerald-400'
                        : thesis.healthScore >= 70
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {thesis.healthScore}
                    <span className="text-xs text-slate-500 font-normal"> / 100</span>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-slate-800" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block">Status:</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5 ${
                      thesis.healthScore >= 80
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {thesis.healthScore >= 80 ? 'Intact & Strong' : 'Monitoring Flagged'}
                  </span>
                </div>
              </div>
            </div>

            {/* Thesis Break Warning if any pillar is weakening or broken */}
            {thesis.thesisBreakRisk?.detected && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border border-amber-500/30 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                      Thesis Break Detector Active: {thesis.thesisBreakRisk.severity} Risk
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {thesis.thesisBreakRisk.evidence}
                  </p>
                  <p className="text-amber-400/90 text-[11px] font-semibold">
                    Recommendation: {thesis.thesisBreakRisk.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pillars Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Underlying Thesis Pillars ({thesis.pillars.length})
            </h3>

            <div className="space-y-3">
              {thesis.pillars.map(pillar => {
                return (
                  <div
                    key={pillar.id}
                    className="p-5 rounded-xl bg-[#111622] border border-[#1E2638] hover:border-sky-500/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{pillar.name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              pillar.status === 'Strong'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : pillar.status === 'Stable'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : pillar.status === 'Weakening'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {pillar.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Allocation Weight in Thesis: {pillar.weight}%
                        </p>
                      </div>

                      {/* Score slider & input */}
                      <div className="flex items-center gap-3 bg-[#0B0E14] px-3.5 py-1.5 rounded-lg border border-[#1E2638] shrink-0">
                        <span className="text-xs text-slate-400 font-medium">Pillar Score:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={pillar.score}
                          onChange={e => handleScoreChange(pillar.id, parseInt(e.target.value, 10))}
                          className="w-24 accent-sky-500 cursor-pointer"
                        />
                        <span className="text-sm font-mono font-bold text-white w-8 text-right">
                          {pillar.score}
                        </span>
                      </div>
                    </div>

                    {/* Supporting Evidence and Latest Update */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-[#1E2638]/70">
                      <div className="p-2.5 rounded bg-[#0B0E14] border border-[#1E2638]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Supporting Evidence & Metrics
                        </span>
                        <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                          {pillar.supportingEvidence}
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-[#0B0E14] border border-[#1E2638]">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                          Latest Market & Filings Update
                        </span>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          {pillar.latestUpdate}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengthening vs Weakening Signals Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#111622] border border-emerald-500/20 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Thesis Strengthening Signals
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {thesis.strengtheningSignals.map((signal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#111622] border border-rose-500/20 space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Thesis Weakening Signals
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {thesis.weakeningSignals.map((signal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 bg-[#111622] rounded-xl border border-[#1E2638]">
          No thesis registered for this holding.
        </div>
      )}
    </div>
  );
};
