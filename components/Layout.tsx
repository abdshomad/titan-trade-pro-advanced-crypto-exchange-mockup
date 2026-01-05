
import React from 'react';
import { TickerData } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void; activeTab: string; setActiveTab: (tab: string) => void }> = ({ theme, toggleTheme, activeTab, setActiveTab }) => (
  <header className="h-10 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center px-4 justify-between text-xs font-medium shrink-0 theme-transition z-50">
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2 text-emerald-500 font-bold tracking-tighter text-base cursor-pointer" onClick={() => setActiveTab('Trade')}>
        <div className="w-5 h-5 bg-emerald-500 rounded-sm flex items-center justify-center text-slate-900">T</div>
        <span>TITAN TRADE</span>
      </div>
      <nav className="flex items-center space-x-4 uppercase text-[10px]">
        {['Trade', 'Account', 'Contracts', 'References', 'API'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 transition-all duration-200 border-b-2 ${
              activeTab === tab 
                ? 'text-[var(--text-primary)] border-emerald-500' 
                : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3 text-[var(--text-secondary)] text-[10px] mono">
        <span>TOTAL: 4.5537 XBT</span>
        <span>AVAIL: 4.4191 XBT</span>
      </div>
      <div className="flex items-center space-x-2 border-l border-[var(--border-color)] pl-4">
        <button 
          onClick={toggleTheme}
          className="bg-slate-700/10 p-1.5 rounded-full hover:bg-slate-700/20 transition-colors text-[var(--text-primary)]"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
        <button className="bg-emerald-600 px-3 py-1 rounded font-bold hover:bg-emerald-500 transition-colors text-[10px] text-white">SIGN IN</button>
      </div>
    </div>
  </header>
);

export const TickerBar: React.FC<{ tickers: TickerData[] }> = ({ tickers }) => (
  <div className="h-8 bg-[var(--bg-main)] border-b border-[var(--border-color)] flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 theme-transition">
    {tickers.map((t, i) => (
      <div key={i} className="flex items-center px-4 space-x-2 border-r border-[var(--border-color)] text-[10px] font-medium min-w-fit">
        <span className="text-[var(--text-secondary)]">{t.symbol}</span>
        <span className={`${t.change >= 0 ? 'text-emerald-500' : 'text-rose-500'} font-bold`}>
          {t.change >= 0 ? '▲' : '▼'} {Math.abs(t.change).toFixed(2)}%
        </span>
        <span className="text-[var(--text-primary)] mono transition-all duration-300">
          {t.price.toLocaleString(undefined, { minimumFractionDigits: t.price < 10 ? 4 : 2 })}
        </span>
      </div>
    ))}
  </div>
);

export const Widget: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`bg-[var(--bg-surface-alt)] border border-[var(--border-color)] rounded-sm flex flex-col overflow-hidden theme-transition ${className}`}>
    <div className="h-7 border-b border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between px-3 shrink-0">
      <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">{title}</span>
      <div className="flex items-center space-x-2 opacity-50">
        <svg className="w-3 h-3 cursor-pointer hover:text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </div>
    </div>
    <div className="flex-1 overflow-auto bg-[var(--mono-bg)]">
      {children}
    </div>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme, activeTab, setActiveTab }) => (
  <div className="h-screen flex flex-col text-[11px] overflow-hidden theme-transition">
    <Header theme={theme} toggleTheme={toggleTheme} activeTab={activeTab} setActiveTab={setActiveTab} />
    <main className="flex-1 bg-[var(--bg-main)] p-1 flex flex-col gap-1 overflow-hidden">
      {children}
    </main>
    <footer className="h-6 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex items-center px-4 justify-between text-[9px] text-[var(--text-muted)] uppercase shrink-0 theme-transition">
      <div className="flex items-center space-x-4">
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          Connected to Tokyo Gateway
        </span>
        <span>Latency: 14ms</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-emerald-500 font-bold">Status: Operational</span>
        <span>v2.12.0</span>
      </div>
    </footer>
  </div>
);
