import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  AlertTriangle,
  Radio,
  Clock,
  Menu,
  X,
  Play,
  Pause,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC<{ onToggleMobileNav?: () => void }> = ({ onToggleMobileNav }) => {
  const {
    marketPulse,
    dataSource,
    refreshMarketData,
    isLoadingQuotes,
    statusMessage,
    setStatusMessage,
    companies,
    setSelectedCompanySymbol,
    isLiveStreaming,
    toggleLiveStreaming,
    lastTickDirections
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [currentIstTime, setCurrentIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentIstTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCompanies = searchQuery.trim()
    ? companies.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.sector.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="sticky top-0 z-20 flex flex-col border-b border-[#1E2638] bg-[#0B0E14]/95 backdrop-blur">
      {/* Top Real-Time Institutional Marquee Ticker */}
      <div className="bg-[#080B10] border-b border-[#1A2234] px-4 py-1 flex items-center overflow-x-auto text-[10px] font-mono no-scrollbar gap-4 text-slate-400">
        <div className="flex items-center gap-1 shrink-0 text-sky-400 font-bold uppercase tracking-wider">
          <Zap className="w-2.5 h-2.5 text-sky-400 fill-sky-400 animate-pulse" />
          <span>NSE FEED:</span>
        </div>

        {/* Indices */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-semibold text-slate-300">NIFTY 50</span>
          <span className="font-bold text-white">
            {marketPulse.nifty50.value.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className={marketPulse.nifty50.change >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {marketPulse.nifty50.change >= 0 ? '+' : ''}{marketPulse.nifty50.changePercent}%
          </span>
        </div>

        <span className="text-slate-700">|</span>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-semibold text-slate-300">SENSEX</span>
          <span className="font-bold text-white">
            {marketPulse.sensex.value.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className={marketPulse.sensex.change >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {marketPulse.sensex.change >= 0 ? '+' : ''}{marketPulse.sensex.changePercent}%
          </span>
        </div>

        <span className="text-slate-700">|</span>

        {/* Ticking companies strip */}
        {companies.slice(0, 8).map(comp => {
          const dir = lastTickDirections[comp.symbol];
          return (
            <div
              key={comp.symbol}
              onClick={() => setSelectedCompanySymbol(comp.symbol)}
              className={`flex items-center gap-1.5 shrink-0 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                dir === 'UP'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : dir === 'DOWN'
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'hover:bg-[#141A26] text-slate-300'
              }`}
            >
              <span className="font-bold">{comp.symbol}</span>
              <span className="text-white font-semibold">₹{comp.currentPrice.toLocaleString('en-IN')}</span>
              <span className={comp.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {comp.dayChangePercent >= 0 ? '+' : ''}{comp.dayChangePercent}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Header Bar */}
      <header className="h-14 px-4 md:px-6 flex items-center justify-between">
        {/* Left: Mobile hamburger + Status */}
        <div className="flex items-center gap-4">
          {onToggleMobileNav && (
            <button
              id="mobile-nav-toggle"
              onClick={onToggleMobileNav}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#161D2B]"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Market Status and IST Clock */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141A26] border border-[#1E2638]">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-200">{currentIstTime || '09:15:00 AM IST'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141A26] border border-[#1E2638]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  marketPulse.marketStatus === 'OPEN'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                }`}
              />
              <span className="text-[11px] font-bold text-slate-300">
                {marketPulse.marketStatus === 'OPEN' ? 'MARKET OPEN' : 'NSE SESSION'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search bar */}
        <div className="relative w-44 sm:w-64 md:w-80">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="global-company-search"
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search 15 universe equities..."
              className="w-full bg-[#141A26] border border-[#1E2638] focus:border-sky-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Autocomplete Dropdown */}
          {showSearchDropdown && filteredCompanies.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#141A26] border border-[#1E2638] rounded-lg shadow-xl overflow-hidden z-50">
              {filteredCompanies.map(comp => (
                <div
                  key={comp.id}
                  onClick={() => {
                    setSelectedCompanySymbol(comp.symbol);
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 hover:bg-[#1C2436] cursor-pointer flex items-center justify-between border-b border-[#1E2638]/50 last:border-0"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">{comp.symbol}</span>
                      <span className="text-[10px] text-slate-400">{comp.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{comp.sector}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-slate-100">
                      ₹{comp.currentPrice.toLocaleString('en-IN')}
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        comp.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {comp.dayChangePercent >= 0 ? '+' : ''}
                      {comp.dayChangePercent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Live Stream Toggle, Mode Badge, Refresh */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Stream Play/Pause Toggle */}
          <button
            id="btn-toggle-stream"
            onClick={toggleLiveStreaming}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isLiveStreaming
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
            title={isLiveStreaming ? 'Live Market Ticks Active (Click to Pause)' : 'Live Ticks Paused (Click to Stream)'}
          >
            {isLiveStreaming ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">STREAMING</span>
                <Pause className="w-3 h-3 text-emerald-400 ml-0.5" />
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline">PAUSED</span>
              </>
            )}
          </button>

          {/* Data Mode Indicator */}
          <div
            id="data-mode-badge"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider border ${
              dataSource === 'LIVE'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                dataSource === 'LIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{dataSource === 'LIVE' ? 'LIVE' : 'DEMO'}</span>
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-market-data"
            onClick={() => refreshMarketData()}
            disabled={isLoadingQuotes}
            className="p-1.5 rounded-lg bg-[#141A26] border border-[#1E2638] text-slate-300 hover:text-white hover:border-sky-500/50 transition-colors disabled:opacity-50"
            title="Force refresh market quotes"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuotes ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>

        {/* Status toast if present */}
        {statusMessage && (
          <div className="absolute bottom-[-36px] right-6 bg-[#161D2B] border border-[#263147] text-slate-300 text-xs px-3 py-1 rounded-md shadow-lg flex items-center gap-2 z-40">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{statusMessage}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-slate-500 hover:text-white ml-2"
            >
              ×
            </button>
          </div>
        )}
      </header>
    </div>
  );
};
