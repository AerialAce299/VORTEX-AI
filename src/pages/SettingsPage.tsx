import React, { useState } from 'react';
import {
  Settings,
  Radio,
  Cpu,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  RefreshCw,
  Server
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_PORTFOLIO_HOLDINGS, INITIAL_COMPANIES } from '../data/universe';

export const SettingsPage: React.FC = () => {
  const {
    upstoxStatus,
    dataSource,
    refreshMarketData,
    isLoadingQuotes,
    setStatusMessage
  } = useApp();

  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleConnectUpstox = async () => {
    try {
      const res = await fetch('/api/upstox/auth-url');
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatusMessage(data.error || 'Upstox credentials not configured on server.');
      }
    } catch (err: any) {
      setStatusMessage(`Error starting Upstox OAuth: ${err.message}`);
    }
  };

  const handleDisconnectUpstox = async () => {
    setIsDisconnecting(true);
    try {
      await fetch('/api/upstox/disconnect', { method: 'POST' });
      await refreshMarketData();
      setStatusMessage('Disconnected from Upstox. Switched back to calibrated DEMO mode.');
    } catch (err: any) {
      setStatusMessage(`Error disconnecting Upstox: ${err.message}`);
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleResetDemoData = () => {
    setIsResetting(true);
    try {
      localStorage.removeItem('vortex_portfolio_holdings_v1');
      localStorage.removeItem('vortex_watchlist_v1');
      localStorage.removeItem('vortex_alerts_v1');
      window.location.reload();
    } catch (e) {
      setIsResetting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Terminal Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Settings & Market Connections
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Configure real-time Upstox API credentials, verify server-side AI status, and manage local workspace state.
        </p>
      </div>

      {/* Upstox Market Data Feed Card */}
      <div className="bg-[#111622] rounded-2xl border border-[#1E2638] p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2638] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upstox Market Data V3 Integration</h2>
              <p className="text-xs text-slate-400">
                Official broker feed for live NSE & BSE equity quotes and indices
              </p>
            </div>
          </div>

          {/* Mode Pill */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                dataSource === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dataSource === 'LIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{dataSource === 'LIVE' ? 'LIVE FEED CONNECTED' : 'CALIBRATED DEMO FEED'}</span>
            </span>
          </div>
        </div>

        {/* Credentials & Security Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Client ID (Server Masked)
            </span>
            <div className="font-mono text-slate-200 font-semibold">
              {upstoxStatus?.clientIdMasked || 'Not Configured'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              OAuth Redirect URI
            </span>
            <div className="font-mono text-slate-200 truncate">
              {upstoxStatus?.redirectUri || '/api/upstox/callback'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Data Caching & Rate-Limit Shield
            </span>
            <div className="font-mono text-emerald-400 font-semibold">
              15-sec TTL Server-Side Cache
            </div>
          </div>
        </div>

        {/* Security callout */}
        <div className="p-3.5 rounded-xl bg-[#141A26] border border-sky-500/20 flex items-start gap-3 text-xs text-slate-300">
          <Lock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Strict Security Architecture:</strong> Upstox Client Secrets and access tokens are managed strictly within secure server-side memory. Zero API keys or secrets are ever leaked or exposed in client bundles or network requests.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => refreshMarketData()}
            disabled={isLoadingQuotes}
            className="px-4 py-2 rounded-xl bg-[#161D2B] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#263147] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuotes ? 'animate-spin text-sky-400' : ''}`} />
            <span>Test Market Quotes Feed</span>
          </button>

          <div className="flex items-center gap-2">
            {upstoxStatus?.isConnected ? (
              <button
                id="btn-disconnect-upstox"
                onClick={handleDisconnectUpstox}
                disabled={isDisconnecting}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
              >
                Disconnect Live Feed
              </button>
            ) : (
              <button
                id="btn-connect-upstox"
                onClick={handleConnectUpstox}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Authorize Upstox Live Feed</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gemini AI Server-Side Engine Card */}
      <div className="bg-[#111622] rounded-2xl border border-[#1E2638] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Gemini AI Analyst Engine</h2>
              <p className="text-xs text-slate-400">
                Institutional reasoning and structured synthesis using Google Gemini API
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Primary Model
            </span>
            <div className="font-mono text-white font-bold">gemini-3.8-flash</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Reasoning Structure
            </span>
            <div className="font-mono text-white font-semibold">Strict JSON Schema Output</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#1E2638]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Fallback Engine
            </span>
            <div className="font-mono text-sky-400 font-semibold">
              Calibrated Institutional Model
            </div>
          </div>
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="bg-[#111622] rounded-2xl border border-[#1E2638] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-slate-400" />
            Reset Demo Environment
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Restore initial 7 demo portfolio holdings, default watchlist, and initial alerts for competition presentation.
          </p>
        </div>

        <button
          id="btn-reset-demo"
          onClick={handleResetDemoData}
          disabled={isResetting}
          className="px-4 py-2 rounded-xl bg-[#161D2B] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#263147] text-xs font-semibold transition-colors shrink-0"
        >
          <span>Reset Demo Portfolio</span>
        </button>
      </div>

      {/* Mandatory Regulatory Financial Disclaimer */}
      <div className="p-5 rounded-2xl bg-[#0B0E14] border border-[#1E2638] text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Institutional Research & Regulatory Disclaimer</span>
        </div>
        <p className="leading-relaxed text-[11px] text-slate-400">
          VORTEX AI is a technology research and portfolio scenario analysis terminal developed for demonstration and institutional decision intelligence. VORTEX AI is not a SEBI-registered Investment Adviser or Research Analyst. None of the materials, metrics, thesis health scores, or AI outputs constitute personal investment recommendations, solicitation of securities, or financial advice. Indian equity investments are subject to market risks. Users and investors should conduct independent financial diligence before committing capital.
        </p>
      </div>
    </div>
  );
};
