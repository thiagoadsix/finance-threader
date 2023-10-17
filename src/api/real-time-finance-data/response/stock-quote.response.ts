export interface StockQuoteResponse {
  symbol: string;
  name: string;
  type: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  previous_close: number;
  change: number;
  change_percent: number;
  pre_or_post_market: number;
  pre_or_post_market_change: number;
  pre_or_post_market_change_percent: number;
  last_update_utc: string;
}
