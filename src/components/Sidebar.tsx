import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Search,
  Bot,
  ScrollText,
  Bell,
  GitFork,
  Settings,
  Sparkles,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, alerts, dataSource } = useApp();

  const unreadAlerts = alerts.filter(a => !a.isRead).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'My Portfolio', icon: Briefcase },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'vortex-ai', label: 'VORTEX AI', icon: Bot, badge: 'AI' },
    { id: 'thesis', label: 'Investment Thesis', icon: ScrollText },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlerts > 0 ? unreadAlerts : undefined },
    { id: 'what-if', label: 'What If?', icon: GitFork },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0F141E] border-r border-[#1E2638] flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      <div>
        {/* Logo and Brand */}
        <div
          id="vortex-brand-header"
          onClick={() => setCurrentPage('landing')}
          className="p-5 flex items-center gap-3 cursor-pointer border-b border-[#1E2638] hover:bg-[#151C2A] transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-black text-lg tracking-wider">
            V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wide">VORTEX</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30 tracking-widest">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-0.5">
              Institutional Intelligence
            </p>
          </div>
        </div>

        {/* Live / Demo Mode Chip */}
        <div className="px-5 py-3 border-b border-[#1E2638]/70 bg-[#0B0E14]/40 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Data Stream
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                dataSource === 'LIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span
              className={`text-[11px] font-bold tracking-wider ${
                dataSource === 'LIVE' ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {dataSource === 'LIVE' ? 'LIVE UPSTOX' : 'DEMO MODE'}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#161D2B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      typeof item.badge === 'number'
                        ? 'bg-rose-500 text-white'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Thesis / Risk Box */}
      <div className="p-4 border-t border-[#1E2638]">
        <div
          onClick={() => setCurrentPage('thesis')}
          className="p-3 rounded-lg bg-[#141A26] border border-[#1E2638] hover:border-sky-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Thesis Health
            </span>
            <span className="text-emerald-400 font-bold">78 / 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full" style={{ width: '78%' }} />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-sky-300 transition-colors">
            <span>HDFC Bank Flagged</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        <div className="mt-3 text-[10px] text-slate-500 text-center tracking-tight">
          VORTEX AI • Designed by SynarkaCore
        </div>
      </div>
    </aside>
  );
};
