interface CashFlowItem {
  year: number;
  quarter: number;
  currency: string;
  net_income: number;
  cash_from_operations: number;
  cash_from_investing: number;
  cash_from_financing: number;
  net_change_in_cash: number;
  free_cash_flow: number;
}

export interface CompanyCashFlowResponse {
  symbol: string;
  type: string;
  cash_flow: CashFlowItem[];
  period: string;
}
