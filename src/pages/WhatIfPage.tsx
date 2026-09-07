import React, { useState, useMemo } from 'react';
import {
  GitFork,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScenarioItem } from '../types';
import { DEMO_SCENARIOS } from '../data/universe';

export const WhatIfPage: React.FC = () => {
  const { holdings, portfolioStats } = useApp();

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [customSector, setCustomSector] = useState<string>('Banking');
  const [customShock, setCustomShock] = useState<number>(-15);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Active scenario
  const activePreset = DEMO_SCENARIOS[selectedScenarioIndex];

  // Real-time mathematical simulation based on actual user holdings
  const simulation = useMemo(() => {
    const totalVal = portfolioStats.totalValue || 1;
    const title = isCustom ? `Custom Shock: ${customSector} ${customShock}%` : activePreset.title;
    const shockSec = isCustom ? customSector : activePreset.title.includes('Banking') ? 'Banking' : activePreset.title.includes('IT') ? 'Information Technology' : '';
    const shockAmt = isCustom ? customShock : activePreset.estimatedImpactPercent;

    const affected = holdings.map(h => {
      const val = h.quantity * h.currentPrice;
      const weight = (val / totalVal) * 100;
      let individualImpact = 0;

      if (shockSec && h.sector.toLowerCase().includes(shockSec.toLowerCase())) {
        individualImpact = isCustom ? customShock : -15;
      } else if (title.includes('NIFTY') || title.includes('Correction')) {
        // High beta for financials & auto, lower beta for consumer/IT
        const beta = h.sector.includes('Banking') ? 1.25 : h.sector.includes('Auto') ? 1.15 : 0.7;
        individualImpact = (isCustom ? customShock : -10) * beta;
      } else if (title.includes('Crude')) {
        if (h.symbol === 'ASIANPAINT') individualImpact = -8.5;
        else if (h.symbol === 'RELIANCE') individualImpact = +2.5; // Refining margin offset
        else individualImpact = -1.8;
      } else if (title.includes('Rate Hike')) {
        if (h.sector.includes('Banking')) individualImpact = -4.5;
        else if (h.sector.includes('Infrastructure')) individualImpact = -6.2;
        else individualImpact = -2.0;
      } else {
        individualImpact = (isCustom ? customShock : -5) * 0.4;
      }

      const loss = (val * individualImpact) / 100;
      return {
        symbol: h.symbol,
        companyName: h.companyName,
        sector: h.sector,
        weight: Number(weight.toFixed(1)),
        impact: Number(individualImpact.toFixed(1)),
        valueImpact: Number(loss.toFixed(0))
      };
    });

    const netLoss = affected.reduce((sum, a) => sum + a.valueImpact, 0);
    const overallPct = Number(((netLoss / totalVal) * 100).toFixed(2));

    const sorted = [...affected].sort((a, b) => a.impact - b.impact);
    const mostAffected = sorted.slice(0, 3);
    const leastAffected = [...sorted].reverse().slice(0, 3);

    return {
      title,
      overallPct,
      netLoss,
      mostAffected,
      leastAffected,
      sectorConcentration: holdings
        .filter(h => !shockSec || h.sector.toLowerCase().includes(shockSec.toLowerCase()))
        .reduce((sum, h) => sum + h.quantity * h.currentPrice, 0) / totalVal * 100
    };
  }, [holdings, portfolioStats.totalValue, isCustom, customSector, customShock, activePreset]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <GitFork className="w-3.5 h-3.5" />
            <span>Scenario Stress-Testing Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            What-If Scenario Simulation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Stress-test your portfolio factor exposures against macroeconomic shocks, sector de-ratings, and rate cycles.
          </p>
        </div>
      </div>

      {/* Preset Scenarios Chips */}
      <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4 space-y-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Preset Institutional Shocks
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_SCENARIOS.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setIsCustom(false);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                !isCustom && selectedScenarioIndex === idx
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-sm'
                  : 'bg-[#161D2B] text-slate-300 border-[#263147] hover:border-sky-500/40 hover:text-white'
              }`}
            >
              {scen.title}
            </button>
          ))}

          <button
            onClick={() => setIsCustom(true)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
              isCustom
                ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-sm'
                : 'bg-[#161D2B] text-slate-300 border-[#263147] hover:border-indigo-500/40 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom Shock Builder</span>
          </button>
        </div>

        {/* Custom shock inputs if custom mode active */}
        {isCustom && (
          <div className="pt-3 border-t border-[#1E2638] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Target Sector Shock
              </label>
              <select
                value={customSector}
                onChange={e => setCustomSector(e.target.value)}
                className="w-full bg-[#0B0E14] border border-[#1E2638] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500"
              >
                <option value="Banking">Banking & Financial Services</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Energy / Conglomerate">Energy / Oil & Gas</option>
                <option value="Automotive">Automotive</option>
                <option value="Telecom">Telecom</option>
                <option value="Infrastructure / Engineering">Infrastructure & Capex</option>
                <option value="FMCG / Consumer">FMCG / Consumer</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                <span>Shock Magnitude</span>
                <span className={`font-mono ${customShock >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {customShock >= 0 ? '+' : ''}{customShock}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="20"
                step="5"
                value={customShock}
                onChange={e => setCustomShock(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>-30% Severe Drawdown</span>
                <span>0%</span>
                <span>+20% Sector Rally</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulation Results Showcase */}
      <div className="bg-[#111622] rounded-2xl border border-sky-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1E2638] pb-6">
          <div>
            <span className="text-[11px] font-extrabold text-sky-400 uppercase tracking-wider block mb-1">
              Active Simulation Scenario
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {simulation.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulating factor transmission onto your ₹{portfolioStats.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })} current NAV.
            </p>
          </div>

          {/* Primary Impact Badge */}
          <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] flex items-center gap-6 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Estimated Portfolio Drawdown
              </span>
              <div
                className={`text-3xl font-mono font-black mt-0.5 ${
                  simulation.overallPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {simulation.overallPct >= 0 ? '+' : ''}{simulation.overallPct}%
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Estimated Rupee Impact
              </span>
              <div
                className={`text-2xl font-mono font-bold mt-0.5 ${
                  simulation.netLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {simulation.netLoss >= 0 ? '+' : ''}₹{Math.abs(simulation.netLoss).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Most Affected vs Defensive Positions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most vulnerable */}
          <div className="p-5 rounded-xl bg-[#0B0E14] border border-rose-500/20 space-y-3">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Most Vulnerable Positions (Drawdown Drag)
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {simulation.mostAffected.map(item => (
                <div key={item.symbol} className="p-2.5 rounded-lg bg-[#141A26] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{item.symbol}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">({item.sector})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-rose-400">{item.impact}%</span>
                    <span className="text-[10px] text-slate-400 ml-2">
                      (₹{Math.abs(item.valueImpact).toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Defensive / Resilient */}
          <div className="p-5 rounded-xl bg-[#0B0E14] border border-emerald-500/20 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Most Resilient Positions / Hedges
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {simulation.leastAffected.map(item => (
                <div key={item.symbol} className="p-2.5 rounded-lg bg-[#141A26] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{item.symbol}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">({item.sector})</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${item.impact >= 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {item.impact >= 0 ? '+' : ''}{item.impact}%
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2">
                      ({item.valueImpact >= 0 ? '+' : ''}₹{Math.abs(item.valueImpact).toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* First-Principles Mathematical Explanation */}
        <div className="p-5 rounded-xl bg-[#141A26] border border-[#1E2638] space-y-2 text-xs">
          <span className="font-bold text-sky-400 uppercase tracking-wider text-[11px] block">
            Analytical Transmission Mechanism
          </span>
          <p className="text-slate-200 leading-relaxed font-medium">
            Your portfolio exposure to {isCustom ? customSector : 'stressed factors'} is{' '}
            <span className="font-bold text-white">{simulation.sectorConcentration.toFixed(1)}%</span>. Under this scenario, direct asset multiple compression combines with cross-asset beta sensitivity to generate a net{' '}
            <span className="font-bold text-rose-400">{simulation.overallPct}%</span> NAV deviation.
          </p>
        </div>

        {/* Watchlist Guidance */}
        <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] text-xs space-y-2">
          <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
            What To Watch & Hedging Considerations
          </span>
          <ul className="space-y-1.5 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-sky-400 font-bold">•</span>
              <span>Monitor weekly institutional FII derivative open interest (NIFTY & BANKNIFTY long/short ratio).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 font-bold">•</span>
              <span>Evaluate partial allocation rebalancing toward defensive IT/FMCG to temper cyclical downside.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
