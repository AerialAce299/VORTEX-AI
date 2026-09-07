import React, { useState } from 'react';
import {
  Bell,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Check,
  X,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AlertCategory, AlertItem, AlertSeverity } from '../types';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertRead, dismissAlert, setSelectedCompanySymbol } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const categories: string[] = [
    'ALL',
    'Thesis Break',
    'Large Price Movement',
    'Portfolio Risk',
    'Earnings',
    'Sector Risk',
    'Concentration Risk'
  ];

  const severities: string[] = ['ALL', 'Critical', 'High', 'Medium', 'Low'];

  const filteredAlerts = alerts.filter(a => {
    const matchCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchSev = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    return matchCat && matchSev;
  });

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const handleMarkAllRead = () => {
    alerts.forEach(a => markAlertRead(a.id));
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Automated Surveillance System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Portfolio & Thesis Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time anomaly detection across price volatility, thesis deviations, and macro sector shocks.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            id="btn-mark-all-read"
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-[#161D2B] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#263147] text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mark All Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-[#161D2B] text-slate-400 hover:text-white hover:bg-[#1E2638]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Severity selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={e => setSelectedSeverity(e.target.value)}
              className="bg-[#0B0E14] border border-[#1E2638] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              {severities.map(sev => (
                <option key={sev} value={sev}>
                  {sev}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'Critical';
            const isHigh = alert.severity === 'High';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                  !alert.isRead
                    ? 'bg-[#141A26] border-sky-500/40 shadow-lg shadow-sky-500/5'
                    : 'bg-[#111622] border-[#1E2638]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : isHigh
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase ${
                          isCritical
                            ? 'bg-rose-500 text-white'
                            : isHigh
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800">
                        {alert.symbol}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {alert.category}
                      </span>
                      <span className="text-[11px] text-slate-500">• {alert.timestamp}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{alert.whatHappened}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {alert.whyItMatters}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-4 text-[11px]">
                      <span className="text-slate-400">
                        <strong className="text-sky-400">Portfolio Impact:</strong> {alert.portfolioImpact}
                      </span>
                      <span className="text-slate-400">
                        <strong className="text-emerald-400">Thesis Impact:</strong> {alert.thesisImpact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => setSelectedCompanySymbol(alert.symbol)}
                    className="px-3 py-1.5 rounded-lg bg-[#161D2B] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#263147] text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Stock</span>
                    <ArrowUpRight className="w-3 h-3 text-sky-400" />
                  </button>

                  {!alert.isRead && (
                    <button
                      onClick={() => markAlertRead(alert.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                      title="Mark as Read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-400 bg-[#111622] rounded-xl border border-[#1E2638]">
            No alerts match your current category and severity filters.
          </div>
        )}
      </div>
    </div>
  );
};
