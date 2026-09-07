/**
 * VORTEX AI — Market Data Normalization
 * Standardizes Upstox Market Quote V3 payloads into the uniform VORTEX Company schema.
 */

import { Company, DataSource } from '../../../src/types';
import { VERIFIED_INSTRUMENTS } from './instruments';

export interface UpstoxQuoteItem {
  instrument_token: string;
  timestamp: string;
  last_price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  net_change: number;
  ohlc?: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  depth?: any;
}

export function normalizeUpstoxQuote(
  symbol: string,
  rawQuote: UpstoxQuoteItem,
  baseCompanyData: Company
): Company {
  const currentPrice = rawQuote.last_price || baseCompanyData.currentPrice;
  const previousClose = rawQuote.ohlc?.close || rawQuote.close || baseCompanyData.previousClose;
  const dayChange = Number((currentPrice - previousClose).toFixed(2));
  const dayChangePercent = previousClose > 0 ? Number(((dayChange / previousClose) * 100).toFixed(2)) : 0;
  const volume = rawQuote.volume || baseCompanyData.volume;

  const fiftyTwoHigh = Math.max(rawQuote.high || 0, baseCompanyData.fiftyTwoWeekHigh);
  const fiftyTwoLow = rawQuote.low && rawQuote.low > 0 
    ? Math.min(rawQuote.low, baseCompanyData.fiftyTwoWeekLow)
    : baseCompanyData.fiftyTwoWeekLow;

  return {
    ...baseCompanyData,
    currentPrice,
    previousClose,
    dayChange,
    dayChangePercent,
    volume,
    fiftyTwoWeekHigh: fiftyTwoHigh,
    fiftyTwoWeekLow: fiftyTwoLow,
    timestamp: rawQuote.timestamp || new Date().toISOString(),
    dataSource: 'UPSTOX'
  };
}
