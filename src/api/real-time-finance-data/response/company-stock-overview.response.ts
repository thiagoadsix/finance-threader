export interface CompanyStockOverviewResponse {
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
  country_code: string;
  exchange: string;
  exchange_open: string;
  exchange_close: string;
  timezone: string;
  utc_offset_sec: number;
  currency: string;
  about: string;
  year_low: number;
  year_high: number;
  primary_exchange: string;
  company_website: string;
  company_country_code: string;
  company_country: string;
  company_state: string;
  company_city: string;
  company_street_address: string;
  company_ceo: string;
  company_employees: number;
  company_cdp_score: string;
  company_founded_date: string;
  company_cdp_url: string;
  avg_volume: number;
  company_pe_ratio: number;
  company_market_cap: number;
  company_dividend_yield: number;
  wikipedia_url: string;
  google_mid: string;
}
