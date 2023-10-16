import { AxiosApi } from "./axios.api";

export class RealTimeFinanceData extends AxiosApi {
  constructor() {
    super(
      process.env.REAL_TIME_FINANCE_DATA_KEY!,
      "https://real-time-finance-data.p.rapidapi.com/",
      process.env.REAL_TIME_FINANCE_DATA_HOST
    );
  }

  async stockQuote(stock: string): Promise<any> {
    return this.get("stock-quote", { symbol: stock, language: "en" });
  }

  async stockNews(stock: string): Promise<any> {
    return this.get("stock-news", { symbol: stock, language: "en" });
  }

  async companyStockOverview(stock: string): Promise<any> {
    return this.get("stock-overview", { symbol: stock, language: "en" });
  }

  async companyIncomeStatement(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<any> {
    return this.get("company-income-statement", {
      symbol: input.stock,
      period: input.period.toLocaleUpperCase(),
      language: "en",
    });
  }

  async companyCashFlow(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<any> {
    return this.get("company-cash-flow", {
      symbol: input.stock,
      period: input.period.toLocaleUpperCase(),
      language: "en",
    });
  }

  async companyBalanceSheet(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<any> {
    return this.get("company-balance-sheet", {
      symbol: input.stock,
      period: input.period.toLocaleUpperCase(),
      language: "en",
    });
  }
}
