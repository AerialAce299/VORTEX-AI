import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ThesisBreakBanner: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider">
              Thesis Alert
            </span>
            <h4 className="text-sm font-bold text-white">
              HDFC Bank — Margin Trajectory Deviation
            </h4>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Pillar 3 (NIM Stability) dropped to <span className="font-bold text-amber-400">68/100</span>. Sticky term deposit renewals are delaying Return on Assets (RoA) expansion back toward the 2.0% post-merger model expectation. Core asset quality remains pristine.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          id="btn-inspect-thesis"
          onClick={() => setCurrentPage('thesis')}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Inspect Thesis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
