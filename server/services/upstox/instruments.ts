/**
 * VORTEX AI — Upstox Instrument Lookup & Registry
 * Official instrument mapping for Indian equities on NSE/BSE.
 * Verified instrument keys follow Upstox Market Data V3 standard: {EXCHANGE}_{SEGMENT}|{ISIN_OR_IDENTIFIER}
 */

export interface InstrumentMetadata {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  segment: 'EQ' | 'INDEX';
  instrumentType: 'EQUITY' | 'INDEX';
  isin: string;
  instrument_key: string;
  sector: string;
  lotSize: number;
}

export const VERIFIED_INSTRUMENTS: Record<string, InstrumentMetadata> = {
  RELIANCE: {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE002A01018',
    instrument_key: 'NSE_EQ|INE002A01018',
    sector: 'Energy / Conglomerate',
    lotSize: 1
  },
  HDFCBANK: {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE040A01034',
    instrument_key: 'NSE_EQ|INE040A01034',
    sector: 'Banking',
    lotSize: 1
  },
  ICICIBANK: {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE090A01021',
    instrument_key: 'NSE_EQ|INE090A01021',
    sector: 'Banking',
    lotSize: 1
  },
  SBIN: {
    symbol: 'SBIN',
    name: 'State Bank of India',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE062A01020',
    instrument_key: 'NSE_EQ|INE062A01020',
    sector: 'Banking',
    lotSize: 1
  },
  TCS: {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE467B01029',
    instrument_key: 'NSE_EQ|INE467B01029',
    sector: 'Information Technology',
    lotSize: 1
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE009A01021',
    instrument_key: 'NSE_EQ|INE009A01021',
    sector: 'Information Technology',
    lotSize: 1
  },
  BHARTIARTL: {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE397D01024',
    instrument_key: 'NSE_EQ|INE397D01024',
    sector: 'Telecom',
    lotSize: 1
  },
  ITC: {
    symbol: 'ITC',
    name: 'ITC Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE154A01025',
    instrument_key: 'NSE_EQ|INE154A01025',
    sector: 'FMCG / Consumer',
    lotSize: 1
  },
  LT: {
    symbol: 'LT',
    name: 'Larsen & Toubro Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE018A01030',
    instrument_key: 'NSE_EQ|INE018A01030',
    sector: 'Infrastructure / Engineering',
    lotSize: 1
  },
  TATAMOTORS: {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE155A01022',
    instrument_key: 'NSE_EQ|INE155A01022',
    sector: 'Automotive',
    lotSize: 1
  },
  'M&M': {
    symbol: 'M&M',
    name: 'Mahindra & Mahindra Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE101A01026',
    instrument_key: 'NSE_EQ|INE101A01026',
    sector: 'Automotive',
    lotSize: 1
  },
  ASIANPAINT: {
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE021A01026',
    instrument_key: 'NSE_EQ|INE021A01026',
    sector: 'Consumer',
    lotSize: 1
  },
  SUNPHARMA: {
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE044A01036',
    instrument_key: 'NSE_EQ|INE044A01036',
    sector: 'Pharmaceuticals',
    lotSize: 1
  },
  HINDUNILVR: {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE030A01027',
    instrument_key: 'NSE_EQ|INE030A01027',
    sector: 'FMCG / Consumer',
    lotSize: 1
  },
  ETERNAL: {
    symbol: 'ETERNAL',
    name: 'Eternal Limited',
    exchange: 'NSE',
    segment: 'EQ',
    instrumentType: 'EQUITY',
    isin: 'INE758T01015',
    instrument_key: 'NSE_EQ|INE758T01015',
    sector: 'Consumer / Internet',
    lotSize: 1
  }
};

export const MARKET_INDICES: Record<string, InstrumentMetadata> = {
  NIFTY50: {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50 Index',
    exchange: 'NSE',
    segment: 'INDEX',
    instrumentType: 'INDEX',
    isin: 'NSE_INDEX_NIFTY50',
    instrument_key: 'NSE_INDEX|Nifty 50',
    sector: 'Benchmark Index',
    lotSize: 25
  },
  SENSEX: {
    symbol: 'SENSEX',
    name: 'BSE SENSEX Index',
    exchange: 'BSE',
    segment: 'INDEX',
    instrumentType: 'INDEX',
    isin: 'BSE_INDEX_SENSEX',
    instrument_key: 'BSE_INDEX|SENSEX',
    sector: 'Benchmark Index',
    lotSize: 10
  },
  INDIAVIX: {
    symbol: 'INDIA VIX',
    name: 'India Volatility Index',
    exchange: 'NSE',
    segment: 'INDEX',
    instrumentType: 'INDEX',
    isin: 'NSE_INDEX_INDIAVIX',
    instrument_key: 'NSE_INDEX|India VIX',
    sector: 'Volatility',
    lotSize: 1
  }
};

export function resolveInstrument(symbol: string): InstrumentMetadata | null {
  const clean = symbol.toUpperCase().trim();
  return VERIFIED_INSTRUMENTS[clean] || null;
}

export function getAllInstrumentKeys(): string[] {
  return Object.values(VERIFIED_INSTRUMENTS).map(item => item.instrument_key);
}
