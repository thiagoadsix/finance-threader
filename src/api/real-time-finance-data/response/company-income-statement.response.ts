interface IncomeStatementItem {
  year: number;
  quarter: number;
  currency: string;
  revenue: number;
  operating_expense: number;
  net_income: number;
  net_profit_margin: number;
  earnings_per_share: number;
  EBITDA: number;
  effective_task_rate_percent: number;
}

export interface CompanyIncomeStatementResponse {
  symbol: string;
  type: string;
  income_statement: IncomeStatementItem[];
  period: string;
}
