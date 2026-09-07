export type DataSource = 'UPSTOX' | 'DEMO';
export type MarketStatus = 'OPEN' | 'CLOSED' | 'PRE_OPEN';
export type ThesisHealthStatus = 'Healthy' | 'Moderate' | 'Weakened' | 'Critical';
export type ImpactType = 'Positive' | 'Neutral' | 'Negative';
export type ThesisImpactType = 'Strengthens' | 'Neutral' | 'Weakens';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type AlertCategory =
  | 'Thesis Break'
  | 'Large Price Movement'
  | 'Earnings'
  | 'Portfolio Risk'
  | 'Sector Risk'
  | 'Concentration Risk'
  | 'Important Company Event';

export interface Company {
  id: string;
  name: string;
  symbol: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  isin: string;
  instrument_key: string;
  currentPrice: number;
  previousClose: number;
  dayChange: number;
  dayChangePercent: number;
  volume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCapCr: number;
  peRatio: number;
  dividendYield: number;
  timestamp: string;
  dataSource: DataSource;
  businessOverview: string;
  keyDrivers: string[];
  risks: string[];
  catalysts: string[];
  recentDevelopments: string[];
  thesisHealthScore: number;
  historicalPoints: Array<{ date: string; price: number; volume: number }>;
  aiAnalysis?: {
    whatChanged: string;
    whyItMatters: string;
    thesisImpact: string;
    whatToWatch: string;
  };
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  companyName: string;
  exchange: 'NSE';
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
  thesisHealth: number;
  notes?: string;
}

export interface ThesisPillar {
  id: string;
  name: string;
  status: 'Strong' | 'Stable' | 'Weakening' | 'Broken';
  score: number; // 0 - 100
  weight: number; // percentage
  supportingEvidence: string;
  latestUpdate: string;
}

export interface InvestmentThesis {
  id: string;
  symbol: string;
  companyName: string;
  thesisStatement: string;
  healthScore: number; // 0 - 100
  healthStatus: ThesisHealthStatus;
  lastAssessed: string;
  pillars: ThesisPillar[];
  strengtheningSignals: string[];
  weakeningSignals: string[];
  thesisBreakRisk: {
    detected: boolean;
    severity: AlertSeverity;
    weakenedAssumptions: string[];
    evidence: string;
    recommendation: 'Monitor Closely' | 'Review Position' | 'Consider Rebalancing';
  };
}

export interface MarketPulse {
  nifty50: { value: number; change: number; changePercent: number; high: number; low: number };
  sensex: { value: number; change: number; changePercent: number; high: number; low: number };
  indiaVix: { value: number; change: number; changePercent: number; status: string };
  marketStatus: MarketStatus;
  lastUpdated: string;
  dataSource: DataSource;
}

export interface WhatChangedEvent {
  id: string;
  title: string;
  company: string;
  symbol: string;
  sector: string;
  category: 'Earnings' | 'Regulatory' | 'Contract' | 'Macro' | 'Management';
  timestamp: string;
  whatChanged: string;
  whyItMatters: string;
  portfolioImpact: ImpactType;
  thesisImpact: ThesisImpactType;
  confidence: ConfidenceLevel;
  evidence: string;
}

export interface VortexAIInsight {
  id: string;
  headline: string;
  summary: string;
  whatChanged: string;
  whyItMatters: string;
  portfolioImpact: string;
  thesisImpact: string;
  confidence: ConfidenceLevel;
  evidence: string;
  watchNext: string[];
  timestamp: string;
  isLive: boolean;
}

export interface AlertItem {
  id: string;
  category: AlertCategory;
  severity: AlertSeverity;
  timestamp: string;
  company: string;
  symbol: string;
  whatHappened: string;
  whyItMatters: string;
  portfolioImpact: string;
  thesisImpact: string;
  isRead: boolean;
  isDismissed: boolean;
}

export interface ScenarioItem {
  id: string;
  title: string;
  description: string;
  type: 'preset' | 'custom';
  shockSector?: string;
  shockPercent?: number;
  estimatedImpactPercent: number;
  mostAffected: Array<{ symbol: string; company: string; impact: number; currentWeight: number }>;
  leastAffected: Array<{ symbol: string; company: string; impact: number; currentWeight: number }>;
  mathematicalReasoning: string;
  whatToWatch: string[];
  evidenceNote: string;
}

export interface UpstoxStatus {
  hasCredentials: boolean;
  isConnected: boolean;
  mode: DataSource;
  clientIdMasked: string;
  redirectUri: string;
  userName?: string | null;
  tokenExpiry?: string;
}

export interface StructuredAIResponse {
  answer: string;
  whatChanged: string;
  whyItMatters: string;
  portfolioImpact: string;
  thesisImpact: string;
  confidence: ConfidenceLevel;
  evidence: string;
  watchNext: string[];
  generatedAt: string;
  model: string;
}
