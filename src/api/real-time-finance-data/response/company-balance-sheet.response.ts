interface BalanceSheetItem {
  year: number;
  currency: string;
  cash_and_short_term_investments: number;
  total_assets: number;
  total_liabilities: number;
  total_equity: number;
  shares_outstanding: number;
  price_to_book: number;
  return_on_assets_percent: number;
  return_on_capital_percent: number;
}

export interface CompanyBalanceSheetResponse {
  symbol: string;
  type: string;
  balance_sheet: BalanceSheetItem[];
  period: string;
}
