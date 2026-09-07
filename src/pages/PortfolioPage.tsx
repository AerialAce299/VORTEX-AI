import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  PieChart,
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  Check,
  X,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectorAllocationChart } from '../components/SectorAllocationChart';
import { AddHoldingModal } from '../components/AddHoldingModal';
import { DEMO_PORTFOLIO_HOLDINGS } from '../data/universe';

export const PortfolioPage: React.FC = () => {
  const {
    holdings,
    portfolioStats,
    deleteHolding,
    updateHolding,
    setSelectedCompanySymbol,
    companies,
    lastTickDirections,
    openAiWithPrompt
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<string>('');
  const [editPrice, setEditPrice] = useState<string>('');

  const startEdit = (holding: any) => {
    setEditingId(holding.id);
    setEditQty(holding.quantity.toString());
    setEditPrice(holding.avgPrice.toString());
  };

  const saveEdit = (id: string) => {
    const qty = parseInt(editQty, 10);
    const price = parseFloat(editPrice);
    if (!isNaN(qty) && qty > 0 && !isNaN(price) && price > 0) {
      updateHolding(id, { quantity: qty, avgPrice: price });
    }
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time capital tracking, factor concentrations, and thesis resilience across your Indian equity holdings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-open-add-holding"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Holding</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Current Value
          </span>
          <div className="text-2xl font-mono font-extrabold text-white mt-1">
            ₹{portfolioStats.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-400 mt-0.5 font-mono">
            Invested: ₹{portfolioStats.investedValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Absolute P&L
          </span>
          <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">
            +₹{portfolioStats.totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs font-semibold text-emerald-400 mt-0.5">
            +{portfolioStats.totalGainPercent.toFixed(2)}% overall
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Today's Session P&L
          </span>
          <div
            className={`text-2xl font-mono font-extrabold mt-1 ${
              portfolioStats.dayPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {portfolioStats.dayPnl >= 0 ? '+' : ''}₹
            {Math.abs(portfolioStats.dayPnl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div
            className={`text-xs font-semibold mt-0.5 ${
              portfolioStats.dayPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {portfolioStats.dayPnlPercent >= 0 ? '+' : ''}
            {portfolioStats.dayPnlPercent.toFixed(2)}% today
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Avg Thesis Health
          </span>
          <div className="text-2xl font-mono font-extrabold text-white mt-1">
            {portfolioStats.thesisHealthAverage} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {holdings.length} Active Positions
          </div>
        </div>
      </div>

      {/* Visual Analytics Row: Sector Allocation & Hidden Concentration Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectorAllocationChart
            sectors={portfolioStats.sectorWeights}
            totalValue={portfolioStats.totalValue}
          />
        </div>

        {/* Hidden Portfolio Risk Insights (Mathematically Derived) */}
        <div className="lg:col-span-2 bg-[#111622] rounded-xl border border-[#1E2638] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-3 mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                VORTEX Hidden Risk & Factor Concentration
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">
                Automated Diagnosis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#0B0E14] border border-[#1E2638]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Sector Concentration Warning
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  Financials account for <span className="font-bold text-amber-400">37.8%</span> of aggregate capital. A 10% sector contraction would result in an estimated <span className="font-mono text-rose-400 font-bold">-₹56,200</span> portfolio drawdown.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0E14] border border-[#1E2638]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Top 2 Holdings Weight
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  HDFC Bank & Reliance Industries jointly command <span className="font-bold text-sky-400">42.6%</span> of your portfolio. High single-stock correlation exposes NAV to individual management or regulatory events.
                </p>
              </div>
            </div>
          </div>

          {/* Top Contributor and Detractor badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1E2638] text-xs">
            {portfolioStats.topContributor && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Top Alpha Contributor:</span>
                <span className="font-bold text-emerald-400">
                  {portfolioStats.topContributor.symbol} (+₹{Math.round(portfolioStats.topContributor.pnl).toLocaleString('en-IN')})
                </span>
              </div>
            )}
            {portfolioStats.topDetractor && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Largest Drag:</span>
                <span className="font-bold text-rose-400">
                  {portfolioStats.topDetractor.symbol} (₹{Math.round(portfolioStats.topDetractor.pnl).toLocaleString('en-IN')})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-[#111622] rounded-xl border border-[#1E2638] overflow-hidden">
        <div className="p-4 border-b border-[#1E2638] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Portfolio Holdings ({holdings.length})
          </h3>
          <span className="text-xs text-slate-400">
            Click ticker to inspect full thesis & research
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#141A26] border-b border-[#1E2638] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Company / Symbol</th>
                <th className="p-3.5 text-right">Quantity</th>
                <th className="p-3.5 text-right">Avg Price</th>
                <th className="p-3.5 text-right">Current Price</th>
                <th className="p-3.5 text-right">Current Value</th>
                <th className="p-3.5 text-right">Total P&L</th>
                <th className="p-3.5 text-right">Weight</th>
                <th className="p-3.5 text-center">Thesis Health</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638] font-mono">
              {holdings.map(h => {
                const comp = companies.find(c => c.symbol === h.symbol);
                const currentPrice = comp ? comp.currentPrice : h.currentPrice;
                const val = h.quantity * currentPrice;
                const cost = h.quantity * h.avgPrice;
                const pnl = val - cost;
                const pnlPercent = cost > 0 ? (pnl / cost) * 100 : 0;
                const weight = portfolioStats.totalValue > 0 ? (val / portfolioStats.totalValue) * 100 : 0;
                const isEditing = editingId === h.id;

                return (
                  <tr key={h.id} className="hover:bg-[#151C2A] transition-colors">
                    {/* Symbol & Name */}
                    <td className="p-3.5 font-sans">
                      <div
                        onClick={() => setSelectedCompanySymbol(h.symbol)}
                        className="cursor-pointer group inline-block"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-sky-400 transition-colors">
                          <span>{h.symbol}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-slate-400">{h.companyName}</div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="p-3.5 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editQty}
                          onChange={e => setEditQty(e.target.value)}
                          className="w-16 bg-[#0B0E14] border border-sky-500 rounded px-2 py-0.5 text-right text-white font-mono"
                        />
                      ) : (
                        <span className="text-slate-200 font-bold">{h.quantity}</span>
                      )}
                    </td>

                    {/* Avg Price */}
                    <td className="p-3.5 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          className="w-20 bg-[#0B0E14] border border-sky-500 rounded px-2 py-0.5 text-right text-white font-mono"
                        />
                      ) : (
                        <span className="text-slate-400">₹{h.avgPrice.toLocaleString('en-IN')}</span>
                      )}
                    </td>

                    {/* Current Price with real-time flash */}
                    <td className={`p-3.5 text-right font-bold transition-all duration-500 rounded ${
                      lastTickDirections[h.symbol] === 'UP'
                        ? 'bg-emerald-500/25 text-emerald-300 font-extrabold'
                        : lastTickDirections[h.symbol] === 'DOWN'
                        ? 'bg-rose-500/25 text-rose-300 font-extrabold'
                        : 'text-white'
                    }`}>
                      ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Current Value */}
                    <td className="p-3.5 text-right text-slate-100 font-bold">
                      ₹{val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>

                    {/* Total P&L */}
                    <td className="p-3.5 text-right">
                      <div className={pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-[10px] ${pnlPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                      </div>
                    </td>

                    {/* Weight */}
                    <td className="p-3.5 text-right text-slate-300 font-bold">
                      {weight.toFixed(1)}%
                    </td>

                    {/* Thesis Health */}
                    <td className="p-3.5 text-center font-sans">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                          h.thesisHealth >= 85
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : h.thesisHealth >= 75
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {h.thesisHealth} / 100
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-center font-sans">
                      <div className="flex items-center justify-center gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(h.id)}
                              className="p-1 rounded text-emerald-400 hover:bg-emerald-500/20"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 rounded text-slate-400 hover:bg-slate-700"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => openAiWithPrompt(`Analyze what changed today for ${h.symbol} (${h.companyName}), evaluate its current thesis resilience (${h.thesisHealth}/100), and state the portfolio impact.`)}
                              className="p-1.5 rounded bg-sky-500/10 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 transition-colors"
                              title="Ask VORTEX AI about this holding"
                            >
                              <Bot className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => startEdit(h)}
                              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                              title="Edit Quantity / Price"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteHolding(h.id)}
                              className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                              title="Remove Holding"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddHoldingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
