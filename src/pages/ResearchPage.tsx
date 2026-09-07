import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Sparkles,
  ArrowUpRight,
  Star,
  Activity,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Company } from '../types';

export const ResearchPage: React.FC = () => {
  const { companies, setSelectedCompanySymbol, watchlist, toggleWatchlist } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'marketCap' | 'change' | 'price' | 'thesis'>('thesis');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [onlyWatchlist, setOnlyWatchlist] = useState(false);

  const sectors = ['All', 'Banking', 'Information Technology', 'Energy / Conglomerate', 'Automotive', 'Telecom', 'Infrastructure / Engineering', 'FMCG / Consumer', 'Pharmaceuticals'];

  const filtered = useMemo(() => {
    return companies
      .filter(c => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase()) ||
          c.sector.toLowerCase().includes(search.toLowerCase());

        const matchesSector =
          selectedSector === 'All' || c.sector.toLowerCase().includes(selectedSector.toLowerCase());

        const matchesWatchlist = !onlyWatchlist || watchlist.includes(c.symbol);

        return matchesSearch && matchesSector && matchesWatchlist;
      })
      .sort((a, b) => {
        if (sortBy === 'change') return b.dayChangePercent - a.dayChangePercent;
        if (sortBy === 'price') return b.currentPrice - a.currentPrice;
        if (sortBy === 'thesis') return b.thesisHealthScore - a.thesisHealthScore;
        // default marketCap / rank
        return 0;
      });
  }, [companies, search, selectedSector, sortBy, onlyWatchlist, watchlist]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Equity Universe Research
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            15 institutional Indian companies with verified Upstox instrument keys, fundamental metrics, and AI intelligence.
          </p>
        </div>

        {/* View mode toggle & watchlist filter */}
        <div className="flex items-center gap-2">
          <button
            id="btn-filter-watchlist"
            onClick={() => setOnlyWatchlist(!onlyWatchlist)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              onlyWatchlist
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#141A26] text-slate-400 border-[#1E2638] hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Watchlist ({watchlist.length})</span>
          </button>

          <div className="flex items-center bg-[#141A26] p-1 rounded-lg border border-[#1E2638]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'table' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by company name, NSE symbol, or sector..."
              className="w-full bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="thesis">Thesis Health (High to Low)</option>
              <option value="change">Day Change %</option>
              <option value="price">Market Price</option>
              <option value="marketCap">Universe Ranking</option>
            </select>
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all text-xs font-semibold ${
                selectedSector === sec
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'bg-[#161D2B] text-slate-400 hover:text-white hover:bg-[#1E2638]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(comp => {
            const isStar = watchlist.includes(comp.symbol);
            return (
              <div
                key={comp.id}
                className="bg-[#111622] rounded-xl border border-[#1E2638] hover:border-sky-500/40 p-5 flex flex-col justify-between space-y-4 transition-all group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white group-hover:text-sky-400 transition-colors">
                          {comp.symbol}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          NSE
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{comp.name}</div>
                    </div>

                    <button
                      onClick={() => toggleWatchlist(comp.symbol)}
                      className="text-slate-500 hover:text-amber-400 p-1"
                    >
                      <Star className={`w-4 h-4 ${isStar ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-baseline justify-between mt-4">
                    <span className="text-2xl font-mono font-extrabold text-white">
                      ₹{comp.currentPrice.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        comp.dayChangePercent >= 0
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {comp.dayChangePercent >= 0 ? '+' : ''}
                      {comp.dayChangePercent}%
                    </span>
                  </div>

                  {/* 52-Week Range */}
                  <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span>L: ₹{comp.fiftyTwoWeekLow.toLocaleString('en-IN')}</span>
                    <span className="text-slate-500">•</span>
                    <span>H: ₹{comp.fiftyTwoWeekHigh.toLocaleString('en-IN')}</span>
                  </div>

                  {/* AI Quick Insight Box */}
                  <div className="mt-4 p-3 rounded-lg bg-[#0B0E14] border border-[#1E2638] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        What Changed
                      </span>
                      <span className="text-emerald-400 font-mono">
                        Thesis: {comp.thesisHealthScore}/100
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                      {comp.aiAnalysis.whatChanged}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  id={`btn-research-${comp.symbol}`}
                  onClick={() => setSelectedCompanySymbol(comp.symbol)}
                  className="w-full py-2 rounded-lg bg-[#161D2B] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#263147] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Deep Research</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#111622] rounded-xl border border-[#1E2638] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#141A26] border-b border-[#1E2638] text-slate-400 text-[10px] uppercase font-semibold">
                <th className="p-3.5 font-sans">Company</th>
                <th className="p-3.5 font-sans">Sector</th>
                <th className="p-3.5 text-right">Current Price</th>
                <th className="p-3.5 text-right">Day Change</th>
                <th className="p-3.5 text-right">52W Range</th>
                <th className="p-3.5 text-center font-sans">Thesis Health</th>
                <th className="p-3.5 text-center font-sans">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638]">
              {filtered.map(comp => (
                <tr key={comp.id} className="hover:bg-[#151C2A] transition-colors">
                  <td className="p-3.5 font-sans">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{comp.symbol}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({comp.name})</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-sans text-slate-400">{comp.sector}</td>
                  <td className="p-3.5 text-right text-white font-bold">
                    ₹{comp.currentPrice.toLocaleString('en-IN')}
                  </td>
                  <td
                    className={`p-3.5 text-right font-bold ${
                      comp.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {comp.dayChangePercent >= 0 ? '+' : ''}
                    {comp.dayChangePercent}%
                  </td>
                  <td className="p-3.5 text-right text-slate-400 text-[11px]">
                    ₹{comp.fiftyTwoWeekLow} - ₹{comp.fiftyTwoWeekHigh}
                  </td>
                  <td className="p-3.5 text-center font-sans">
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-sky-500/15 text-sky-300">
                      {comp.thesisHealthScore} / 100
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-sans">
                    <button
                      onClick={() => setSelectedCompanySymbol(comp.symbol)}
                      className="text-sky-400 hover:text-sky-300 font-semibold text-xs"
                    >
                      Research
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
