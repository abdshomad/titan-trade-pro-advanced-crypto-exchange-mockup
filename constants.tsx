
import { TickerData, Position, OrderBookEntry, Trade } from './types';

export const TICKERS: TickerData[] = [
  { symbol: 'XBTUSD', price: 62794.50, change: -0.06, volume: '343.8M' },
  { symbol: 'ETHUSD', price: 3342.48, change: 1.25, volume: '112.1M' },
  { symbol: 'SOLUSD', price: 145.22, change: -2.14, volume: '45.2M' },
  { symbol: 'ADAUSD', price: 0.4521, change: 0.81, volume: '12.4M' },
  { symbol: 'XRPUSD', price: 0.6214, change: -3.26, volume: '22.1M' },
  { symbol: 'DOTUSD', price: 7.24, change: 1.15, volume: '8.4M' },
];

export const MOCK_POSITIONS: Position[] = [
  {
    symbol: 'XBTUSD',
    size: -1000,
    value: 0.1592,
    entryPrice: 7332.50,
    markPrice: 6279.18,
    liqPrice: 552486.0,
    margin: 0.1574,
    unrealizedPnl: 0.0228,
    realizedPnl: 0.0027,
  }
];

export const generateOrderBook = (basePrice: number): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < 20; i++) {
    const bidSize = Math.floor(Math.random() * 15000) + 1000;
    const askSize = Math.floor(Math.random() * 15000) + 1000;
    bidTotal += bidSize;
    askTotal += askSize;
    
    bids.push({ price: basePrice - (i * 0.5) - 0.5, size: bidSize, total: bidTotal });
    asks.push({ price: basePrice + (i * 0.5) + 0.5, size: askSize, total: askTotal });
  }
  
  return { bids, asks };
};

export const updateOrderBook = (current: { bids: OrderBookEntry[], asks: OrderBookEntry[] }, basePrice: number) => {
  const newBids = current.bids.map((b, i) => {
    const change = (Math.random() - 0.5) * 2000;
    const newSize = Math.max(500, b.size + change);
    return { ...b, price: basePrice - (i * 0.5) - 0.5, size: Math.floor(newSize) };
  });

  const newAsks = current.asks.map((a, i) => {
    const change = (Math.random() - 0.5) * 2000;
    const newSize = Math.max(500, a.size + change);
    return { ...a, price: basePrice + (i * 0.5) + 0.5, size: Math.floor(newSize) };
  });

  // Re-calculate totals
  let bidTotal = 0;
  newBids.forEach(b => { bidTotal += b.size; b.total = bidTotal; });
  let askTotal = 0;
  newAsks.forEach(a => { askTotal += a.size; a.total = askTotal; });

  return { bids: newBids, asks: newAsks };
};

export const generateTrade = (basePrice: number): Trade => ({
  id: Math.random().toString(36).substr(2, 9),
  price: basePrice + (Math.random() - 0.5) * 1,
  size: Math.floor(Math.random() * 10000) + 100,
  time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
  side: Math.random() > 0.5 ? 'buy' : 'sell'
});
