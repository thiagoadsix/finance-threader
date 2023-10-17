import { AxiosApi } from "../axios.api";

import {
  CompanyBalanceSheetResponse,
  CompanyCashFlowResponse,
  CompanyIncomeStatementResponse,
  CompanyStockOverviewResponse,
  StockNewsResponse,
  StockQuoteResponse,
} from "./response";

export class RealTimeFinanceData extends AxiosApi {
  private readonly headers = {
    "X-RapidAPI-Key": process.env.REAL_TIME_FINANCE_DATA_KEY!,
    "X-RapidAPI-Host": process.env.REAL_TIME_FINANCE_DATA_HOST!,
  };

  constructor() {
    super("https://real-time-finance-data.p.rapidapi.com/");
  }

  async stockQuote(stock: string): Promise<StockQuoteResponse> {
    return this.get(
      "stock-quote",
      { symbol: stock, language: "en" },
      this.headers
    );
  }

  async stockNews(stock: string): Promise<StockNewsResponse> {
    return this.get(
      "stock-news",
      { symbol: stock, language: "en" },
      this.headers
    );
  }

  async companyStockOverview(
    stock: string
  ): Promise<CompanyStockOverviewResponse> {
    return this.get(
      "stock-overview",
      { symbol: stock, language: "en" },
      this.headers
    );
  }

  async companyIncomeStatement(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<CompanyIncomeStatementResponse> {
    return this.get(
      "company-income-statement",
      {
        symbol: input.stock,
        period: input.period.toLocaleUpperCase(),
        language: "en",
      },
      this.headers
    );
  }

  async companyCashFlow(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<CompanyCashFlowResponse> {
    return this.get(
      "company-cash-flow",
      {
        symbol: input.stock,
        period: input.period.toLocaleUpperCase(),
        language: "en",
      },
      this.headers
    );
  }

  async companyBalanceSheet(input: {
    stock: string;
    period: "annual" | "quarterly";
  }): Promise<CompanyBalanceSheetResponse> {
    return this.get(
      "company-balance-sheet",
      {
        symbol: input.stock,
        period: input.period.toLocaleUpperCase(),
        language: "en",
      },
      this.headers
    );
  }
}
