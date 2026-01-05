
import React, { useState } from 'react';

export const OrderForm: React.FC = () => {
  const [orderType, setOrderType] = useState('Limit');
  
  // Tick size for XBTUSD is 0.5 as specified in ContractsView
  const tickSize = 0.5;
  
  return (
    <div className="flex flex-col h-full bg-slate-500/5 p-3 space-y-4 theme-transition">
      <div className="flex rounded-sm bg-slate-500/10 p-1">
        {['Limit', 'Market', 'Stop'].map(type => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 py-1 text-[9px] uppercase font-bold transition-colors ${orderType === type ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[var(--text-muted)] font-bold flex justify-between">
            Quantity <span>USD</span>
          </label>
          <div className="relative">
            <input type="number" defaultValue="1" className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-sm py-1 px-2 text-[var(--text-primary)] mono focus:border-emerald-500 outline-none transition-colors" />
            <div className="absolute right-2 top-1.5 text-[var(--text-muted)] text-[8px] font-bold">CONTRACTS</div>
          </div>
        </div>

        {orderType !== 'Market' && (
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-[var(--text-muted)] font-bold flex justify-between">
              {orderType} Price <span>USD</span>
            </label>
            <input 
              type="number" 
              defaultValue="62794.5" 
              step={orderType === 'Limit' ? tickSize : "0.1"}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-sm py-1 px-2 text-[var(--text-primary)] mono focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm py-3 px-1 transition-all flex flex-col items-center shadow-lg active:scale-95">
          <span className="font-black text-sm uppercase">Buy / Long</span>
          <span className="text-[8px] opacity-70">1 @ {orderType.toUpperCase()}</span>
        </button>
        <button className="bg-rose-600 hover:bg-rose-500 text-white rounded-sm py-3 px-1 transition-all flex flex-col items-center shadow-lg active:scale-95">
          <span className="font-black text-sm uppercase">Sell / Short</span>
          <span className="text-[8px] opacity-70">1 @ {orderType.toUpperCase()}</span>
        </button>
      </div>

      <div className="space-y-1.5 border-t border-[var(--border-color)] pt-3">
        {[
          { label: 'Cost', value: '0.0000 XBT' },
          { label: 'Order Value', value: '0.0001 XBT' },
          { label: 'Avail Balance', value: '4.4191 XBT' },
        ].map(item => (
          <div key={item.label} className="flex justify-between text-[10px] items-baseline">
            <span className="text-[var(--text-muted)]">{item.label}</span>
            <span className="text-[var(--text-secondary)] mono">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1 mt-auto">
        <div className="text-[9px] uppercase font-bold text-[var(--text-muted)] mb-1">Leverage</div>
        <div className="flex h-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-sm relative overflow-hidden theme-transition">
          <div className="absolute top-0 left-0 h-full bg-emerald-500/10 w-1/4"></div>
          <div className="z-10 w-full flex items-center justify-between px-2 mono text-[10px]">
            <span className="text-[var(--text-primary)] font-bold">1.00x</span>
            <span className="text-[var(--text-muted)]">Leverage</span>
          </div>
        </div>
        <div className="flex justify-between px-1 text-[8px] text-[var(--text-muted)] font-bold">
          <span>Cross</span><span>1x</span><span>2x</span><span>3x</span><span>5x</span><span>10x</span><span>25x</span><span>100x</span>
        </div>
      </div>
    </div>
  );
};
