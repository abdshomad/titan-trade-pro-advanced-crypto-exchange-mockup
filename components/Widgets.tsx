
import React, { useEffect, useState } from 'react';
import { OrderBookEntry, Trade } from '../types';

export const OrderBookWidget: React.FC<{ bids: OrderBookEntry[]; asks: OrderBookEntry[]; currentPrice: number }> = ({ bids, asks, currentPrice }) => {
  const [prevPrice, setPrevPrice] = useState(currentPrice);
  const priceColor = currentPrice >= prevPrice ? 'text-emerald-500' : 'text-rose-500';

  useEffect(() => {
    const timer = setTimeout(() => setPrevPrice(currentPrice), 1000);
    return () => clearTimeout(timer);
  }, [currentPrice]);

  return (
    <div className="flex flex-col h-full bg-[var(--mono-bg)] mono text-[10px] select-none theme-transition">
      <div className="grid grid-cols-3 px-3 py-1 bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold text-[8px]">
        <span>Total</span>
        <span className="text-right">Size</span>
        <span className="text-right">Price</span>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Asks (Sells) - Red */}
        <div className="flex flex-col-reverse overflow-hidden">
          {asks.slice(0, 15).map((ask, i) => (
            <div key={i} className="grid grid-cols-3 px-3 py-0.5 relative group hover:bg-slate-500/10">
               <div className="absolute inset-y-0 right-0 bg-rose-500/10 transition-all duration-300" style={{ width: `${Math.min(100, (ask.size / 30000) * 100)}%` }}></div>
               <span className="text-[var(--text-muted)] z-10">{ask.total.toLocaleString()}</span>
               <span className="text-right text-[var(--text-secondary)] z-10">{ask.size.toLocaleString()}</span>
               <span className="text-right text-rose-500 font-bold z-10">{ask.price.toFixed(1)}</span>
            </div>
          ))}
        </div>
        
        <div className="h-10 flex flex-col items-center justify-center bg-slate-500/5 border-y border-[var(--border-color)] my-1 shrink-0">
          <div className={`font-black text-sm transition-colors duration-500 ${priceColor}`}>
            {currentPrice.toFixed(1)} {currentPrice >= prevPrice ? '▲' : '▼'}
          </div>
          <div className="text-[var(--text-muted)] text-[8px] mono">Mark Price</div>
        </div>

        {/* Bids (Buys) - Green */}
        <div className="flex flex-col overflow-hidden">
          {bids.slice(0, 15).map((bid, i) => (
            <div key={i} className="grid grid-cols-3 px-3 py-0.5 relative group hover:bg-slate-500/10">
               <div className="absolute inset-y-0 right-0 bg-emerald-500/10 transition-all duration-300" style={{ width: `${Math.min(100, (bid.size / 30000) * 100)}%` }}></div>
               <span className="text-[var(--text-muted)] z-10">{bid.total.toLocaleString()}</span>
               <span className="text-right text-[var(--text-secondary)] z-10">{bid.size.toLocaleString()}</span>
               <span className="text-right text-emerald-500 font-bold z-10">{bid.price.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecentTradesWidget: React.FC<{ trades: Trade[] }> = ({ trades }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--mono-bg)] mono text-[10px] select-none theme-transition">
      <div className="grid grid-cols-3 px-3 py-1 bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold text-[8px]">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Time</span>
      </div>
      <div className="flex-1 overflow-auto">
        {trades.map((trade) => (
          <div key={trade.id} className={`grid grid-cols-3 px-3 py-0.5 hover:bg-slate-500/10 cursor-default animate-in fade-in slide-in-from-top-1 duration-300`}>
            <span className={`font-bold ${trade.side === 'buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trade.price.toFixed(1)}
            </span>
            <span className="text-right text-[var(--text-secondary)]">{trade.size.toLocaleString()}</span>
            <span className="text-right text-[var(--text-muted)]">{trade.time}</span>
          </div>
        ))}
        {trades.length === 0 && (
          <div className="flex items-center justify-center h-full text-[var(--text-muted)] italic uppercase font-bold text-[9px]">
            Waiting for trades...
          </div>
        )}
      </div>
    </div>
  );
};
