import React, { useState, useMemo, useRef, useEffect } from 'react';

interface ChartPoint {
  date: string;
  price: number;
  volume: number;
}

interface InteractiveChartProps {
  data: ChartPoint[];
  symbol: string;
  color?: string;
  height?: number;
}

type Timeframe = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y';

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  symbol,
  color,
  height = 280
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  // ResizeObserver for fluid SVG width
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Synthetic or filtered timeframe points
  const points = useMemo(() => {
    const basePrice = data.length > 0 ? data[data.length - 1].price : 1000;
    let count = 30;
    let stepRatio = 0.015;

    switch (timeframe) {
      case '1D':
        count = 15;
        stepRatio = 0.003;
        break;
      case '1W':
        count = 20;
        stepRatio = 0.008;
        break;
      case '1M':
        count = 30;
        stepRatio = 0.015;
        break;
      case '6M':
        count = 45;
        stepRatio = 0.025;
        break;
      case '1Y':
        count = 60;
        stepRatio = 0.04;
        break;
      case '5Y':
        count = 80;
        stepRatio = 0.07;
        break;
    }

    const generated: ChartPoint[] = [];
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = count; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i * (timeframe === '1D' ? 0.05 : timeframe === '1W' ? 0.35 : timeframe === '1M' ? 1 : timeframe === '6M' ? 4 : timeframe === '1Y' ? 6 : 22));
      
      const wave = Math.sin((i + seed) * 0.35) * (basePrice * stepRatio);
      const trend = ((count - i) / count) * (basePrice * stepRatio * 1.5);
      const priceVal = Math.max(10, Number((basePrice - trend + wave).toFixed(2)));
      const volVal = Math.floor(1000000 + Math.abs(Math.sin(i * 1.2)) * 4000000);

      generated.push({
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        price: i === 0 ? basePrice : priceVal,
        volume: volVal
      });
    }

    return generated;
  }, [data, symbol, timeframe]);

  const prices = points.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice || 1;

  const volumes = points.map(p => p.volume);
  const maxVolume = Math.max(...volumes) || 1;

  const isPositive = points.length > 1 && points[points.length - 1].price >= points[0].price;
  const strokeColor = color || (isPositive ? '#10B981' : '#EF4444');
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  const padding = { top: 20, right: 15, bottom: 40, left: 15 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = Math.max(100, width - padding.left - padding.right);

  // Path generator
  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, point, index) => {
      const x = padding.left + (index / (points.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((point.price - minPrice) / range) * (chartHeight * 0.75) - chartHeight * 0.25;
      return `${acc} ${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }, '');
  }, [points, minPrice, range, chartWidth, chartHeight]);

  const areaD = useMemo(() => {
    if (!pathD) return '';
    const lastX = padding.left + chartWidth;
    const firstX = padding.left;
    const bottomY = padding.top + chartHeight;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD, chartWidth, chartHeight]);

  const currentHover = hoveredPoint || points[points.length - 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - padding.left;
    const ratio = Math.max(0, Math.min(1, mouseX / chartWidth));
    const index = Math.round(ratio * (points.length - 1));
    if (points[index]) {
      setHoveredPoint(points[index]);
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#111622] rounded-xl border border-[#1E2638] p-4 select-none">
      {/* Chart Header: Current selection & Timeframe selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-xl font-mono font-extrabold text-white">
            ₹{currentHover ? currentHover.price.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '—'}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{currentHover ? currentHover.date : ''}</span>
            <span>•</span>
            <span className="font-mono text-slate-300">
              Vol: {currentHover ? (currentHover.volume / 100000).toFixed(2) + ' L' : '—'}
            </span>
          </div>
        </div>

        {/* Timeframe Chips */}
        <div className="flex items-center gap-1 bg-[#161D2B] p-1 rounded-lg border border-[#263147]">
          {(['1D', '1W', '1M', '6M', '1Y', '5Y'] as Timeframe[]).map(tf => (
            <button
              key={tf}
              id={`tf-btn-${tf}`}
              onClick={() => {
                setTimeframe(tf);
                setHoveredPoint(null);
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                timeframe === tf
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2638]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative">
        <svg
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
          className="cursor-crosshair overflow-visible"
        >
          <defs>
            <linearGradient id={`grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left + chartWidth}
            y2={padding.top}
            stroke="#1E2638"
            strokeDasharray="3 3"
          />
          <line
            x1={padding.left}
            y1={padding.top + chartHeight * 0.5}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight * 0.5}
            stroke="#1E2638"
            strokeDasharray="3 3"
          />
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="#1E2638"
          />

          {/* Volume bars (subtle bottom 20% of canvas) */}
          {points.map((p, idx) => {
            const barW = Math.max(1.5, chartWidth / points.length - 1);
            const x = padding.left + (idx / (points.length - 1)) * chartWidth - barW / 2;
            const barHeight = (p.volume / maxVolume) * 35;
            const y = padding.top + chartHeight - barHeight;
            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={barW}
                height={barHeight}
                fill="#334155"
                opacity="0.4"
              />
            );
          })}

          {/* Price Area & Line */}
          <path d={areaD} fill={`url(#grad-${symbol})`} />
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hover Crosshair */}
          {hoveredPoint && (
            (() => {
              const idx = points.indexOf(hoveredPoint);
              if (idx < 0) return null;
              const x = padding.left + (idx / (points.length - 1)) * chartWidth;
              const y = padding.top + chartHeight - ((hoveredPoint.price - minPrice) / range) * (chartHeight * 0.75) - chartHeight * 0.25;
              return (
                <g>
                  <line x1={x} y1={padding.top} x2={x} y2={padding.top + chartHeight} stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx={x} cy={y} r="5" fill={strokeColor} stroke="#0B0E14" strokeWidth="2" />
                </g>
              );
            })()
          )}
        </svg>
      </div>

      {/* High / Low footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
        <span>Low: ₹{minPrice.toLocaleString('en-IN')}</span>
        <span>Range: {timeframe}</span>
        <span>High: ₹{maxPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};
