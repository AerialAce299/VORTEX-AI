/**
 * VORTEX AI — Upstox Market Quotes V3 Service
 * Fetches official Upstox quotes with caching, error resilience, and graceful DEMO fallback.
 */

import { Company, MarketPulse, MarketStatus, DataSource } from '../../../src/types';
import { INITIAL_COMPANIES } from '../../../src/data/universe';
import { VERIFIED_INSTRUMENTS, MARKET_INDICES, getAllInstrumentKeys } from './instruments';
import { getActiveAccessToken } from './auth';
import { normalizeUpstoxQuote } from './normalizer';

interface CacheEntry {
  data: Company[];
  pulse: MarketPulse;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 15000; // 15 seconds cache

export function getMarketStatusIST(): { status: MarketStatus; timeStr: string } {
  const now = new Date();
  // Convert current UTC time to IST (UTC+5:30)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 3600000 * 5.5);

  const day = istDate.getDay(); // 0 = Sun, 6 = Sat
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  const timeStr = istDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) + ' IST';

  // Weekend: Market Closed
  if (day === 0 || day === 6) {
    return { status: 'CLOSED', timeStr };
  }

  // Pre-open: 9:00 AM - 9:08 AM IST (540 - 548 minutes)
  if (timeInMinutes >= 540 && timeInMinutes < 548) {
    return { status: 'PRE_OPEN', timeStr };
  }

  // Regular Trading Session: 9:15 AM - 3:30 PM IST (555 - 930 minutes)
  if (timeInMinutes >= 555 && timeInMinutes <= 930) {
    return { status: 'OPEN', timeStr };
  }

  return { status: 'CLOSED', timeStr };
}

export function getDemoMarketPulse(): MarketPulse {
  const { status, timeStr } = getMarketStatusIST();
  return {
    nifty50: {
      value: 24860.25,
      change: 142.80,
      changePercent: 0.58,
      high: 24920.50,
      low: 24710.15
    },
    sensex: {
      value: 81520.40,
      change: 480.15,
      changePercent: 0.59,
      high: 81700.00,
      low: 81050.20
    },
    indiaVix: {
      value: 12.84,
      change: -0.42,
      changePercent: -3.17,
      status: 'Low Volatility'
    },
    marketStatus: status,
    lastUpdated: timeStr,
    dataSource: 'DEMO'
  };
}

export async function fetchMarketData(): Promise<{
  companies: Company[];
  pulse: MarketPulse;
  source: DataSource;
  error?: string;
}> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return {
      companies: memoryCache.data,
      pulse: memoryCache.pulse,
      source: memoryCache.pulse.dataSource
    };
  }

  const token = getActiveAccessToken();
  const { status, timeStr } = getMarketStatusIST();

  // If no token, return high-fidelity demo dataset
  if (!token) {
    const demoPulse = getDemoMarketPulse();
    const demoCompanies = INITIAL_COMPANIES.map(c => ({
      ...c,
      dataSource: 'DEMO' as DataSource,
      timestamp: timeStr
    }));

    memoryCache = {
      data: demoCompanies,
      pulse: demoPulse,
      timestamp: now
    };

    return {
      companies: demoCompanies,
      pulse: demoPulse,
      source: 'DEMO'
    };
  }

  // Attempt live Upstox Market Quote V3 call
  try {
    const instrumentKeys = getAllInstrumentKeys();
    const indexKeys = Object.values(MARKET_INDICES).map(idx => idx.instrument_key);
    const allKeys = [...instrumentKeys, ...indexKeys].join(',');

    const endpoint = `https://api.upstox.com/v2/market-quote/quotes?instrument_key=${encodeURIComponent(allKeys)}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Upstox API quote fetch returned status ${response.status}: ${errText}. Falling back to DEMO mode.`);
      const demoPulse = getDemoMarketPulse();
      return {
        companies: INITIAL_COMPANIES,
        pulse: demoPulse,
        source: 'DEMO',
        error: `Upstox live quote call failed (${response.status}). Displaying calibrated demo data.`
      };
    }

    const json = await response.json();
    const quotesData = json?.data || {};

    // Normalize each company
    const updatedCompanies: Company[] = INITIAL_COMPANIES.map(baseCompany => {
      const metadata = VERIFIED_INSTRUMENTS[baseCompany.symbol];
      if (!metadata) return baseCompany;

      // Upstox response keys format: e.g. "NSE_EQ:RELIANCE" or "NSE_EQ:INE002A01018"
      const keyColon = metadata.instrument_key.replace('|', ':');
      const rawQuote = quotesData[keyColon] || quotesData[metadata.instrument_key];

      if (rawQuote) {
        return normalizeUpstoxQuote(baseCompany.symbol, rawQuote, baseCompany);
      }
      return baseCompany;
    });

    // Parse Indices
    const niftyKey = MARKET_INDICES.NIFTY50.instrument_key.replace('|', ':');
    const sensexKey = MARKET_INDICES.SENSEX.instrument_key.replace('|', ':');
    const vixKey = MARKET_INDICES.INDIAVIX.instrument_key.replace('|', ':');

    const rawNifty = quotesData[niftyKey];
    const rawSensex = quotesData[sensexKey];
    const rawVix = quotesData[vixKey];

    const pulse: MarketPulse = {
      nifty50: rawNifty ? {
        value: rawNifty.last_price,
        change: rawNifty.net_change,
        changePercent: Number(((rawNifty.net_change / (rawNifty.last_price - rawNifty.net_change)) * 100).toFixed(2)),
        high: rawNifty.ohlc?.high || rawNifty.high || 24920,
        low: rawNifty.ohlc?.low || rawNifty.low || 24710
      } : getDemoMarketPulse().nifty50,

      sensex: rawSensex ? {
        value: rawSensex.last_price,
        change: rawSensex.net_change,
        changePercent: Number(((rawSensex.net_change / (rawSensex.last_price - rawSensex.net_change)) * 100).toFixed(2)),
        high: rawSensex.ohlc?.high || rawSensex.high || 81700,
        low: rawSensex.ohlc?.low || rawSensex.low || 81050
      } : getDemoMarketPulse().sensex,

      indiaVix: rawVix ? {
        value: rawVix.last_price,
        change: rawVix.net_change,
        changePercent: Number(((rawVix.net_change / (rawVix.last_price - rawVix.net_change)) * 100).toFixed(2)),
        status: rawVix.last_price > 18 ? 'Elevated Volatility' : 'Normal / Benign'
      } : getDemoMarketPulse().indiaVix,

      marketStatus: status,
      lastUpdated: timeStr,
      dataSource: 'UPSTOX'
    };

    memoryCache = {
      data: updatedCompanies,
      pulse,
      timestamp: now
    };

    return {
      companies: updatedCompanies,
      pulse,
      source: 'UPSTOX'
    };
  } catch (error: any) {
    console.error('Error in fetchMarketData:', error);
    const demoPulse = getDemoMarketPulse();
    return {
      companies: INITIAL_COMPANIES,
      pulse: demoPulse,
      source: 'DEMO',
      error: `Connection to Upstox failed: ${error.message}. Operating in DEMO mode.`
    };
  }
}
