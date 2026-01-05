
import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Bar, Cell, Tooltip } from 'recharts';

const generateChartData = () => {
  const data = [];
  let basePrice = 62794;
  for (let i = 0; i < 40; i++) {
    const change = (Math.random() - 0.5) * 50;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    data.push({
      time: i,
      open,
      close,
      high,
      low,
      volume: Math.random() * 100,
      color: close >= open ? '#10b981' : '#f43f5e'
    });
    basePrice = close;
  }
  return data;
};

export const TradingChart: React.FC = () => {
  const data = useMemo(() => generateChartData(), []);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="absolute top-4 left-6 z-10 flex flex-col space-y-1">
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-100">XBTUSD</span>
          <span className="text-emerald-400">62794.5 ▲ 0.06%</span>
        </div>
        <div className="text-[9px] text-slate-500 space-x-2 uppercase font-mono">
          <span>O: 62710.0</span>
          <span>H: 63012.5</span>
          <span>L: 62511.0</span>
          <span>C: 62794.5</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} orientation="right" tick={{fontSize: 9, fill: '#64748b'}} width={40} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px', fontSize: '9px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="volume" yAxisId={0} opacity={0.3}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          {/* Custom drawing for candlesticks since Recharts doesn't natively do OHLC easily without hacking */}
          <rect fill="transparent" />
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Visual Overlay for mock purposes */}
      <div className="absolute inset-0 pointer-events-none border border-slate-700/30 flex items-center justify-center opacity-10">
        <span className="text-6xl font-black text-white/10 uppercase tracking-[2rem]">TITAN TRADE</span>
      </div>
    </div>
  );
};
