/**
 * VORTEX AI — Central Application State
 * Manages portfolio holdings, live/demo market quotes, alerts, theses, and navigation.
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Company,
  PortfolioHolding,
  InvestmentThesis,
  AlertItem,
  WhatChangedEvent,
  MarketPulse,
  DataSource,
  UpstoxStatus
} from '../types';
import {
  INITIAL_COMPANIES,
  DEMO_PORTFOLIO_HOLDINGS,
  DEMO_THESES,
  DEMO_ALERTS,
  DEMO_WHAT_CHANGED
} from '../data/universe';

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'portfolio'
  | 'research'
  | 'vortex-ai'
  | 'thesis'
  | 'alerts'
  | 'what-if'
  | 'settings';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  companies: Company[];
  holdings: PortfolioHolding[];
  theses: Record<string, InvestmentThesis>;
  alerts: AlertItem[];
  whatChangedEvents: WhatChangedEvent[];
  marketPulse: MarketPulse;
  dataSource: DataSource;
  upstoxStatus: UpstoxStatus | null;
  selectedCompanySymbol: string | null;
  setSelectedCompanySymbol: (symbol: string | null) => void;
  watchlist: string[];
  toggleWatchlist: (symbol: string) => void;
  addHolding: (holding: Omit<PortfolioHolding, 'id'>) => void;
  updateHolding: (id: string, updates: Partial<PortfolioHolding>) => void;
  deleteHolding: (id: string) => void;
  updateThesis: (symbol: string, thesis: InvestmentThesis) => void;
  markAlertRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  refreshMarketData: () => Promise<void>;
  isLoadingQuotes: boolean;
  isLiveStreaming: boolean;
  toggleLiveStreaming: () => void;
  lastTickDirections: Record<string, 'UP' | 'DOWN'>;
  activeAiPrompt: string;
  setActiveAiPrompt: (prompt: string) => void;
  openAiWithPrompt: (prompt: string) => void;
  statusMessage: string | null;
  setStatusMessage: (msg: string | null) => void;
  portfolioStats: {
    totalValue: number;
    investedValue: number;
    totalGain: number;
    totalGainPercent: number;
    dayPnl: number;
    dayPnlPercent: number;
    thesisHealthAverage: number;
    topContributor: { symbol: string; pnl: number } | null;
    topDetractor: { symbol: string; pnl: number } | null;
    sectorWeights: Record<string, { value: number; weight: number }>;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_HOLDINGS = 'vortex_portfolio_holdings_v1';
const LOCAL_STORAGE_KEY_WATCHLIST = 'vortex_watchlist_v1';
const LOCAL_STORAGE_KEY_ALERTS = 'vortex_alerts_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [theses, setTheses] = useState<Record<string, InvestmentThesis>>(DEMO_THESES);
  const [whatChangedEvents, setWhatChangedEvents] = useState<WhatChangedEvent[]>(DEMO_WHAT_CHANGED);
  const [selectedCompanySymbol, setSelectedCompanySymbol] = useState<string | null>(null);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [upstoxStatus, setUpstoxStatus] = useState<UpstoxStatus | null>(null);

  // Initialize holdings from localStorage or demo defaults
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HOLDINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read holdings from localStorage');
    }
    return DEMO_PORTFOLIO_HOLDINGS;
  });

  // Watchlist state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WATCHLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['ETERNAL', 'ICICIBANK', 'INFY'];
  });

  // Alerts state
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ALERTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEMO_ALERTS;
  });

  const [marketPulse, setMarketPulse] = useState<MarketPulse>({
    nifty50: { value: 24860.25, change: 142.80, changePercent: 0.58, high: 24920.50, low: 24710.15 },
    sensex: { value: 81520.40, change: 480.15, changePercent: 0.59, high: 81700.00, low: 81050.20 },
    indiaVix: { value: 12.84, change: -0.42, changePercent: -3.17, status: 'Normal' },
    marketStatus: 'CLOSED',
    lastUpdated: new Date().toLocaleTimeString('en-IN') + ' IST',
    dataSource: 'DEMO'
  });

  const [dataSource, setDataSource] = useState<DataSource>('DEMO');

  // Save holdings to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_HOLDINGS, JSON.stringify(holdings));
    } catch (e) {}
  }, [holdings]);

  // Save watchlist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WATCHLIST, JSON.stringify(watchlist));
    } catch (e) {}
  }, [watchlist]);

  // Save alerts to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ALERTS, JSON.stringify(alerts));
    } catch (e) {}
  }, [alerts]);

  // Fetch Upstox Status & Market Quotes on mount
  const refreshMarketData = async () => {
    setIsLoadingQuotes(true);
    try {
      // 1. Check Upstox status
      const statusRes = await fetch('/api/upstox/status');
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setUpstoxStatus(statusData);
        setDataSource(statusData.mode);
      }

      // 2. Fetch live/demo quotes
      const quotesRes = await fetch('/api/market/quotes');
      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        if (quotesData.companies) {
          setCompanies(quotesData.companies);
          // Sync current prices in holdings with updated quotes
          setHoldings(prev => prev.map(h => {
            const found = quotesData.companies.find((c: Company) => c.symbol === h.symbol);
            if (found) {
              return { ...h, currentPrice: found.currentPrice };
            }
            return h;
          }));
        }
        if (quotesData.pulse) {
          setMarketPulse(quotesData.pulse);
        }
        if (quotesData.source) {
          setDataSource(quotesData.source);
        }
        if (quotesData.error) {
          setStatusMessage(quotesData.error);
        }
      }
    } catch (err: any) {
      console.error('Failed to refresh market quotes:', err);
      setStatusMessage('Using calibrated demo feed (live connection standby).');
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [lastTickDirections, setLastTickDirections] = useState<Record<string, 'UP' | 'DOWN'>>({});
  const [activeAiPrompt, setActiveAiPrompt] = useState<string>('');

  const toggleLiveStreaming = () => {
    setIsLiveStreaming(prev => !prev);
  };

  const openAiWithPrompt = (promptText: string) => {
    setActiveAiPrompt(promptText);
    setCurrentPage('vortex-ai');
  };

  useEffect(() => {
    refreshMarketData();
    // Periodic fallback refresh every 30 seconds
    const interval = setInterval(refreshMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Real-Time Server-Sent Events (SSE) Live Feed Subscription
  useEffect(() => {
    if (!isLiveStreaming) return;

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/market/stream');

      eventSource.addEventListener('tick', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          if (data.ticks && Array.isArray(data.ticks)) {
            const newDirections: Record<string, 'UP' | 'DOWN'> = {};

            setCompanies(prevCompanies => {
              const updated = [...prevCompanies];
              data.ticks.forEach((tick: any) => {
                newDirections[tick.symbol] = tick.direction;
                const idx = updated.findIndex(c => c.symbol === tick.symbol);
                if (idx !== -1) {
                  updated[idx] = {
                    ...updated[idx],
                    currentPrice: tick.price,
                    dayChange: tick.dayChange,
                    dayChangePercent: tick.dayChangePercent
                  };
                }
              });
              return updated;
            });

            // Update holdings current prices in real time
            setHoldings(prevHoldings => {
              return prevHoldings.map(h => {
                const matchedTick = data.ticks.find((t: any) => t.symbol === h.symbol);
                if (matchedTick) {
                  return { ...h, currentPrice: matchedTick.price };
                }
                return h;
              });
            });

            setLastTickDirections(prev => ({ ...prev, ...newDirections }));

            // Clear direction flash animation after 1200ms
            setTimeout(() => {
              setLastTickDirections(prev => {
                const next = { ...prev };
                data.ticks.forEach((t: any) => {
                  delete next[t.symbol];
                });
                return next;
              });
            }, 1200);
          }

          // Update indices if provided
          if (data.indices) {
            setMarketPulse(prev => ({
              ...prev,
              nifty50: {
                ...prev.nifty50,
                value: data.indices.nifty?.value || prev.nifty50.value,
                change: data.indices.nifty?.change || prev.nifty50.change,
                changePercent: data.indices.nifty?.pct || prev.nifty50.changePercent
              },
              sensex: {
                ...prev.sensex,
                value: data.indices.sensex?.value || prev.sensex.value,
                change: data.indices.sensex?.change || prev.sensex.change,
                changePercent: data.indices.sensex?.pct || prev.sensex.changePercent
              },
              indiaVix: {
                ...prev.indiaVix,
                value: data.indices.vix?.value || prev.indiaVix.value
              },
              lastUpdated: new Date().toLocaleTimeString('en-IN') + ' IST'
            }));
          }
        } catch (parseErr) {
          console.error('Error parsing SSE tick:', parseErr);
        }
      });

      eventSource.onerror = err => {
        console.warn('SSE connection disconnected, retrying in background:', err);
      };
    } catch (err) {
      console.warn('Failed to start EventSource:', err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [isLiveStreaming]);

  // Check URL query parameters (e.g. from Upstox OAuth callback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('upstox') === 'success') {
      setStatusMessage('Upstox connected successfully! Switched to LIVE market data.');
      refreshMarketData();
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('upstox') === 'error') {
      const msg = params.get('message') || 'Upstox authorization was not completed';
      setStatusMessage(`Upstox error: ${msg}`);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Portfolio Aggregates & Hidden Risk Engine
  const portfolioStats = useMemo(() => {
    let totalValue = 0;
    let investedValue = 0;
    let dayPnl = 0;
    let thesisSum = 0;
    const sectorWeights: Record<string, { value: number; weight: number }> = {};
    const holdingPnls: Array<{ symbol: string; pnl: number }> = [];

    holdings.forEach(h => {
      const comp = companies.find(c => c.symbol === h.symbol);
      const currentPrice = comp ? comp.currentPrice : h.currentPrice;
      const prevPrice = comp ? comp.previousClose : currentPrice;

      const positionVal = h.quantity * currentPrice;
      const costVal = h.quantity * h.avgPrice;
      const positionDayPnl = h.quantity * (currentPrice - prevPrice);

      totalValue += positionVal;
      investedValue += costVal;
      dayPnl += positionDayPnl;
      thesisSum += h.thesisHealth;

      holdingPnls.push({ symbol: h.symbol, pnl: positionVal - costVal });

      if (!sectorWeights[h.sector]) {
        sectorWeights[h.sector] = { value: 0, weight: 0 };
      }
      sectorWeights[h.sector].value += positionVal;
    });

    const totalGain = totalValue - investedValue;
    const totalGainPercent = investedValue > 0 ? (totalGain / investedValue) * 100 : 0;
    const dayPnlPercent = (totalValue - dayPnl) > 0 ? (dayPnl / (totalValue - dayPnl)) * 100 : 0;
    const thesisHealthAverage = holdings.length > 0 ? Math.round(thesisSum / holdings.length) : 80;

    Object.keys(sectorWeights).forEach(sec => {
      sectorWeights[sec].weight = totalValue > 0 ? (sectorWeights[sec].value / totalValue) * 100 : 0;
    });

    holdingPnls.sort((a, b) => b.pnl - a.pnl);
    const topContributor = holdingPnls.length > 0 ? holdingPnls[0] : null;
    const topDetractor = holdingPnls.length > 0 ? holdingPnls[holdingPnls.length - 1] : null;

    return {
      totalValue,
      investedValue,
      totalGain,
      totalGainPercent,
      dayPnl,
      dayPnlPercent,
      thesisHealthAverage,
      topContributor,
      topDetractor,
      sectorWeights
    };
  }, [holdings, companies]);

  // Holdings manipulation
  const addHolding = (newHolding: Omit<PortfolioHolding, 'id'>) => {
    const id = `h-${Date.now()}`;
    setHoldings(prev => [...prev, { ...newHolding, id }]);
  };

  const updateHolding = (id: string, updates: Partial<PortfolioHolding>) => {
    setHoldings(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  };

  const deleteHolding = (id: string) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  // Thesis manipulation
  const updateThesis = (symbol: string, updatedThesis: InvestmentThesis) => {
    setTheses(prev => ({
      ...prev,
      [symbol]: updatedThesis
    }));
  };

  // Watchlist manipulation
  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  // Alerts manipulation
  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, isDismissed: true } : a)));
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        companies,
        holdings,
        theses,
        alerts: alerts.filter(a => !a.isDismissed),
        whatChangedEvents,
        marketPulse,
        dataSource,
        upstoxStatus,
        selectedCompanySymbol,
        setSelectedCompanySymbol,
        watchlist,
        toggleWatchlist,
        addHolding,
        updateHolding,
        deleteHolding,
        updateThesis,
        markAlertRead,
        dismissAlert,
        refreshMarketData,
        isLoadingQuotes,
        isLiveStreaming,
        toggleLiveStreaming,
        lastTickDirections,
        activeAiPrompt,
        setActiveAiPrompt,
        openAiWithPrompt,
        statusMessage,
        setStatusMessage,
        portfolioStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
