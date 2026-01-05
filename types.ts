
export interface Trade {
  id: string;
  price: number;
  size: number;
  time: string;
  side: 'buy' | 'sell';
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface Position {
  symbol: string;
  size: number;
  value: number;
  entryPrice: number;
  markPrice: number;
  liqPrice: number;
  margin: number;
  unrealizedPnl: number;
  realizedPnl: number;
}

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
}
