
import React, { useState, useEffect, useMemo } from 'react';
import { Layout, TickerBar, Widget } from './components/Layout';
import { OrderForm } from './components/OrderForm';
import { TradingChart } from './components/TradingView';
import { OrderBookWidget, RecentTradesWidget } from './components/Widgets';
import { AccountView, ContractsView, ReferencesView, ApiView } from './components/Views';
import { TICKERS, MOCK_POSITIONS, generateOrderBook, updateOrderBook, generateTrade } from './constants';
import { TickerData, Trade, OrderBookEntry } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('titan-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('Trade');
  const [positionsTab, setPositionsTab] = useState('Open Positions');
  const [tickers, setTickers] = useState<TickerData[]>(TICKERS);
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[], asks: OrderBookEntry[] }>(() => generateOrderBook(62794.5));
  const [trades, setTrades] = useState<Trade[]>([]);
  
  const activePosition = MOCK_POSITIONS[0];

  // Live PnL Calculation for XBTUSD (Inverse Perpetual)
  // Formula: Contracts * (1/EntryPrice - 1/MarkPrice)
  const positionStats = useMemo(() => {
    const markPrice = tickers[0].price;
    const entryPrice = activePosition.entryPrice;
    const size = activePosition.size; // -1000 (Short)
    
    const unrealizedPnl = size * (1 / entryPrice - 1 / markPrice);
    const roe = (unrealizedPnl / activePosition.margin) * 100;
    
    return {
      unrealizedPnl,
      roe,
      markPrice
    };
  }, [tickers, activePosition]);

  // Persist and apply theme
  useEffect(() => {
    localStorage.setItem('titan-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Simulation Engine (Running even in background to keep data fresh)
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const drift = (Math.random() - 0.5) * (t.price * 0.0002);
        const newPrice = t.price + drift;
        return { ...t, price: newPrice };
      }));
    }, 2000);

    const orderBookInterval = setInterval(() => {
      setOrderBook(prev => updateOrderBook(prev, tickers[0].price));
    }, 500);

    const tradeInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        const newTrade = generateTrade(tickers[0].price);
        setTrades(prev => [newTrade, ...prev].slice(0, 50));
      }
    }, 800);

    return () => {
      clearInterval(tickerInterval);
      clearInterval(orderBookInterval);
      clearInterval(tradeInterval);
    };
  }, [tickers[0].price]);

  const renderPositionsTab = () => {
    switch (positionsTab) {
      case 'Open Positions':
        return (
          <table className="w-full text-left mono text-[10px]">
            <thead className="bg-slate-500/10 text-[8px] uppercase font-bold text-[var(--text-muted)] sticky top-0 z-20">
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Value</th>
                <th className="px-4 py-2">Entry Price</th>
                <th className="px-4 py-2">Mark Price</th>
                <th className="px-4 py-2">Liq. Price</th>
                <th className="px-4 py-2">Margin</th>
                <th className="px-4 py-2">Unrealized PNL (%)</th>
                <th className="px-4 py-2">Realized PNL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              <tr className="hover:bg-slate-500/5">
                <td className="px-4 py-2 font-bold text-[var(--text-primary)]">XBTUSD</td>
                <td className={`px-4 py-2 font-bold ${activePosition.size >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {activePosition.size.toLocaleString()}
                </td>
                <td className="px-4 py-2">{(Math.abs(activePosition.size) / positionStats.markPrice).toFixed(4)} XBT</td>
                <td className="px-4 py-2">{activePosition.entryPrice.toFixed(2)}</td>
                <td className="px-4 py-2 mono transition-all duration-300">{positionStats.markPrice.toFixed(2)}</td>
                <td className="px-4 py-2 text-orange-500 font-bold">{activePosition.liqPrice.toFixed(1)}</td>
                <td className="px-4 py-2">{activePosition.margin.toFixed(4)} XBT (10.00x)</td>
                <td className={`px-4 py-2 font-bold transition-colors duration-500 ${positionStats.unrealizedPnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {positionStats.unrealizedPnl.toFixed(4)} XBT ({positionStats.roe.toFixed(2)}%)
                </td>
                <td className="px-4 py-2 text-emerald-500">{activePosition.realizedPnl.toFixed(4)} XBT</td>
              </tr>
            </tbody>
          </table>
        );
      case 'Closed Positions':
        return (
          <table className="w-full text-left mono text-[10px]">
            <thead className="bg-slate-500/10 text-[8px] uppercase font-bold text-[var(--text-muted)] sticky top-0 z-20">
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Entry</th>
                <th className="px-4 py-2">Exit</th>
                <th className="px-4 py-2">Realized PNL</th>
                <th className="px-4 py-2">Closed Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {[
                { s: 'ETHUSD', q: '+2500', en: '3310.50', ex: '3345.10', pnl: '0.0421', t: '2023-11-24 10:15:22' },
                { s: 'SOLUSD', q: '-500', en: '148.20', ex: '144.10', pnl: '0.0155', t: '2023-11-23 18:42:01' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-500/5">
                  <td className="px-4 py-2 text-[var(--text-primary)]">{item.s}</td>
                  <td className={`px-4 py-2 ${item.q.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{item.q}</td>
                  <td className="px-4 py-2">{item.en}</td>
                  <td className="px-4 py-2">{item.ex}</td>
                  <td className="px-4 py-2 text-emerald-500 font-bold">{item.pnl} XBT</td>
                  <td className="px-4 py-2 text-[var(--text-muted)]">{item.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Active Orders':
        return (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] p-10">
            <svg className="w-8 h-8 opacity-20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            <span className="uppercase font-bold tracking-widest text-[10px]">No Active Orders</span>
          </div>
        );
      case 'Order History':
        return (
          <table className="w-full text-left mono text-[10px]">
            <thead className="bg-slate-500/10 text-[8px] uppercase font-bold text-[var(--text-muted)] sticky top-0 z-20">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Side</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {[
                { t: '14:10:01', s: 'XBTUSD', ty: 'Limit', side: 'Sell', p: '63150.0', q: '1000', st: 'Filled' },
                { t: '13:45:22', s: 'ETHUSD', ty: 'Market', side: 'Buy', p: '3345.1', q: '2500', st: 'Filled' },
                { t: '13:02:11', s: 'SOLUSD', ty: 'Limit', side: 'Buy', p: '142.0', q: '100', st: 'Cancelled' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-500/5">
                  <td className="px-4 py-2 text-[var(--text-muted)]">{item.t}</td>
                  <td className="px-4 py-2 font-bold text-[var(--text-primary)]">{item.s}</td>
                  <td className="px-4 py-2 text-[var(--text-secondary)]">{item.ty}</td>
                  <td className={`px-4 py-2 font-bold ${item.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.side}</td>
                  <td className="px-4 py-2">{item.p}</td>
                  <td className="px-4 py-2">{item.q}</td>
                  <td className={`px-4 py-2 ${item.st === 'Cancelled' ? 'text-rose-500' : 'text-emerald-500'}`}>{item.st}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Execution History':
        return (
          <table className="w-full text-left mono text-[10px]">
            <thead className="bg-slate-500/10 text-[8px] uppercase font-bold text-[var(--text-muted)] sticky top-0 z-20">
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Side</th>
                <th className="px-4 py-2">Exec Price</th>
                <th className="px-4 py-2">Exec Qty</th>
                <th className="px-4 py-2">Fee</th>
                <th className="px-4 py-2">Execution Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {[
                { s: 'XBTUSD', side: 'Sell', p: '62942.5', q: '1000', f: '0.000045 XBT', t: '2023-11-24 14:10:01' },
                { s: 'ETHUSD', side: 'Buy', p: '3345.1', q: '2500', f: '0.000124 XBT', t: '2023-11-24 13:45:22' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-500/5">
                  <td className="px-4 py-2 text-[var(--text-primary)] font-bold">{item.s}</td>
                  <td className={`px-4 py-2 font-bold ${item.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.side}</td>
                  <td className="px-4 py-2">{item.p}</td>
                  <td className="px-4 py-2">{item.q}</td>
                  <td className="px-4 py-2 text-rose-500">{item.f}</td>
                  <td className="px-4 py-2 text-[var(--text-muted)]">{item.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Account': return <AccountView />;
      case 'Contracts': return <ContractsView />;
      case 'References': return <ReferencesView />;
      case 'API': return <ApiView />;
      default: return (
        <div className="flex flex-1 gap-1 overflow-hidden">
          {/* Left Sidebar - Order Form & Details */}
          <div className="w-[280px] flex flex-col gap-1 shrink-0">
            <Widget title="Place Order" className="h-[430px]">
              <OrderForm />
            </Widget>
            
            <Widget title="Your Position: XBTUSD" className="h-[180px]">
               <div className="p-3 bg-[var(--mono-bg)] h-full flex flex-col justify-between theme-transition">
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col">
                        <span className={`${activePosition.size >= 0 ? 'text-emerald-500' : 'text-rose-500'} font-black text-xl`}>
                          {activePosition.size.toLocaleString()}
                        </span>
                        <span className="text-[9px] uppercase text-[var(--text-muted)] font-bold">Contracts</span>
                     </div>
                     <div className="flex flex-col text-right">
                        <span className={`${positionStats.roe >= 0 ? 'text-emerald-500' : 'text-rose-500'} font-black text-xl transition-colors duration-500`}>
                          {positionStats.roe >= 0 ? '+' : ''}{positionStats.roe.toFixed(2)}%
                        </span>
                        <span className="text-[9px] uppercase text-[var(--text-muted)] font-bold">ROE</span>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                     <div>
                        <div className="text-[8px] text-[var(--text-muted)] uppercase font-bold">Entry Price</div>
                        <div className="mono text-sm text-[var(--text-primary)]">{activePosition.entryPrice.toFixed(1)}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-[8px] text-[var(--text-muted)] uppercase font-bold">Mark Price</div>
                        <div className="mono text-sm text-[var(--text-primary)] transition-all duration-300">
                          {positionStats.markPrice.toFixed(2)}
                        </div>
                     </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-sm p-2 mt-4 flex justify-between items-center">
                     <span className="text-[9px] uppercase font-bold text-emerald-500">Isolated 10x</span>
                     <span className={`mono text-[10px] transition-colors duration-500 ${positionStats.unrealizedPnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                       {positionStats.unrealizedPnl >= 0 ? '+' : ''}{positionStats.unrealizedPnl.toFixed(4)} XBT
                     </span>
                  </div>
               </div>
            </Widget>

            <Widget title="Contract Details: XBTUSD" className="flex-1">
               <div className="p-3 text-[10px] space-y-2 uppercase font-medium">
                  <div className={`text-lg font-black mono transition-colors duration-300 ${tickers[0].change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                     {tickers[0].price.toFixed(1)} {tickers[0].change >= 0 ? '▲' : '▼'}
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-color)] pb-1">
                     <span className="text-[var(--text-muted)]">24H Volume</span>
                     <span className="text-[var(--text-secondary)]">{tickers[0].volume} USD</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-color)] pb-1">
                     <span className="text-[var(--text-muted)]">Open Interest</span>
                     <span className="text-[var(--text-secondary)]">212,047,641 USD</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-color)] pb-1">
                     <span className="text-[var(--text-muted)]">Funding Rate</span>
                     <span className="text-emerald-500 font-bold">0.0100% IN 6 HOURS</span>
                  </div>
               </div>
            </Widget>
          </div>

          {/* Center - Charts & Book */}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            <div className="flex h-[500px] gap-1 shrink-0">
              <Widget title="Orderbook (XBTUSD)" className="w-[280px]">
                <OrderBookWidget bids={orderBook.bids} asks={orderBook.asks} currentPrice={tickers[0].price} />
              </Widget>
              <Widget title="Recent Trades (XBTUSD)" className="w-[220px]">
                <RecentTradesWidget trades={trades} />
              </Widget>
              <Widget title="Chart (XBTUSD)" className="flex-1">
                <TradingChart />
              </Widget>
            </div>
            
            <div className="flex-1 flex flex-col gap-1 min-h-0">
               <div className="h-8 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-sm flex items-center px-4 space-x-6 text-[10px] font-bold uppercase tracking-wider overflow-x-auto scrollbar-hide shrink-0 theme-transition">
                  {[
                    'Open Positions', 
                    'Closed Positions', 
                    'Active Orders', 
                    'Order History', 
                    'Execution History'
                  ].map((tab) => (
                    <span 
                      key={tab}
                      onClick={() => setPositionsTab(tab)}
                      className={`cursor-pointer h-full flex items-center transition-all duration-200 border-b-2 ${
                        positionsTab === tab 
                          ? 'text-[var(--text-primary)] border-emerald-500' 
                          : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab === 'Open Positions' ? 'Open Positions [1]' : tab === 'Active Orders' ? 'Active Orders [0]' : tab}
                    </span>
                  ))}
               </div>
               <div className="flex-1 bg-[var(--mono-bg)] border border-[var(--border-color)] border-t-0 overflow-auto theme-transition">
                  {renderPositionsTab()}
               </div>
            </div>
          </div>

          {/* Right Sidebar - Wallet & Depth */}
          <div className="w-[280px] flex flex-col gap-1 shrink-0">
            <Widget title="Depth Chart" className="h-[250px]">
               <div className="h-full flex flex-col items-center justify-center bg-slate-500/5 p-4">
                  <div className="w-full flex-1 flex items-end gap-[1px]">
                     {orderBook.bids.slice(0, 20).reverse().map((b, i) => (
                        <div key={`bid-${i}`} className="flex-1 bg-emerald-500/20" style={{ height: `${(b.total / orderBook.bids[19].total) * 100}%` }}></div>
                     ))}
                     {orderBook.asks.slice(0, 20).map((a, i) => (
                        <div key={`ask-${i}`} className="flex-1 bg-rose-500/20" style={{ height: `${(a.total / orderBook.asks[19].total) * 100}%` }}></div>
                     ))}
                  </div>
                  <div className="flex justify-between w-full text-[8px] mt-2 text-[var(--text-muted)] mono font-bold">
                     <span>{(tickers[0].price * 0.99).toFixed(0)}</span>
                     <span>{tickers[0].price.toFixed(0)}</span>
                     <span>{(tickers[0].price * 1.01).toFixed(0)}</span>
                  </div>
               </div>
            </Widget>

            <Widget title="Margin Balance" className="flex-1">
               <div className="p-4 space-y-4">
                  <div className="space-y-1">
                     {[
                       { label: 'Wallet Balance', value: '4.5537 XBT' },
                       { label: 'Unrealized PNL', value: `${positionStats.unrealizedPnl.toFixed(4)} XBT` },
                       { label: 'Margin Balance', value: `${(4.5537 + positionStats.unrealizedPnl).toFixed(4)} XBT` },
                       { label: 'Position Margin', value: `${activePosition.margin.toFixed(4)} XBT` },
                       { label: 'Order Margin', value: '0.0000 XBT' },
                       { label: 'Available Balance', value: `${(4.5537 + positionStats.unrealizedPnl - activePosition.margin).toFixed(4)} XBT` },
                     ].map((item, i) => (
                        <div key={i} className="flex justify-between text-[11px] items-baseline py-1 border-b border-[var(--border-color)]">
                           <span className="text-[var(--text-secondary)] font-medium">{item.label}</span>
                           <span className="text-[var(--text-primary)] mono font-bold">{item.value}</span>
                        </div>
                     ))}
                  </div>
                  
                  <div className="bg-slate-500/10 p-3 rounded-sm border border-[var(--border-color)]">
                     <div className="text-[9px] uppercase font-bold text-[var(--text-muted)] mb-2 flex justify-between">
                        Margin Used <span>{((activePosition.margin / (4.5537 + positionStats.unrealizedPnl)) * 100).toFixed(1)}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(activePosition.margin / (4.5537 + positionStats.unrealizedPnl)) * 100}%` }}></div>
                     </div>
                     <div className="mt-2 text-[10px] text-[var(--text-secondary)] font-bold">
                        0.03x Leverage
                     </div>
                  </div>
               </div>
            </Widget>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} activeTab={activeTab} setActiveTab={setActiveTab}>
      <TickerBar tickers={tickers} />
      {renderContent()}
    </Layout>
  );
};

export default App;
