import React from 'react';

interface SectorAllocationChartProps {
  sectors: Record<string, { value: number; weight: number }>;
  totalValue: number;
}

const SECTOR_COLORS: Record<string, string> = {
  'Banking': '#38BDF8', // Sky
  'Energy / Conglomerate': '#F59E0B', // Amber
  'Information Technology': '#818CF8', // Indigo
  'Telecom': '#34D399', // Emerald
  'Infrastructure / Engineering': '#FB923C', // Orange
  'Pharmaceuticals': '#A78BFA', // Purple
  'FMCG / Consumer': '#F472B6', // Pink
  'Automotive': '#4ADE80', // Green
  'Consumer': '#E879F9', // Fuchsia
  'Consumer / Internet': '#2DD4BF' // Teal
};

export const SectorAllocationChart: React.FC<SectorAllocationChartProps> = ({
  sectors,
  totalValue
}) => {
  const entries = Object.entries(sectors) as [string, { value: number; weight: number }][];
  const sorted = entries.sort((a, b) => b[1].weight - a[1].weight);

  return (
    <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white tracking-wide">Sector Allocation</h3>
        <span className="text-xs text-slate-400 font-mono">
          {sorted.length} Sectors Exposed
        </span>
      </div>

      {/* Segmented multi-color bar */}
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex mb-5">
        {sorted.map(([name, data]) => {
          const color = SECTOR_COLORS[name] || '#94A3B8';
          return (
            <div
              key={name}
              title={`${name}: ${data.weight.toFixed(1)}%`}
              style={{ width: `${data.weight}%`, backgroundColor: color }}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
            />
          );
        })}
      </div>

      {/* Sector breakdown list */}
      <div className="space-y-2.5">
        {sorted.map(([name, data]) => {
          const color = SECTOR_COLORS[name] || '#94A3B8';
          return (
            <div key={name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 max-w-[65%] truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-slate-300 truncate font-medium">{name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 font-mono">
                <span className="text-slate-400 text-[11px]">
                  ₹{(data.value / 100000).toFixed(2)} L
                </span>
                <span className="font-bold text-slate-100 w-12 text-right">
                  {data.weight.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
