import { parentPort } from "worker_threads";

import { RealTimeFinanceData } from "../api/real-time-finance-data";

import stockQuoteMock from "./mocked/stock-quote.mock";
import stockNewsMock from "./mocked/stock-news.mock";
import companyStockOverviewMock from "./mocked/company-stock-overview.mock";
import companyIncomeStatementMock from "./mocked/company-income-statement.mock";
import companyCashFlowMock from "./mocked/company-cash-flow.mock";
import companyBalanceSheetMock from "./mocked/company-balance-sheet.mock";

parentPort?.on("message", async (message) => {
  console.log("Message from parent port", JSON.stringify(message));

  const realTimeFinanceData = new RealTimeFinanceData();

  try {
    let result;

    switch (message.queryType) {
      case "stockQuote":
        result =
          process.env.ENV === "development"
            ? stockQuoteMock
            : await realTimeFinanceData.stockQuote(message.data.stock);
        break;
      case "stockNews":
        result =
          process.env.ENV === "development"
            ? stockNewsMock
            : await realTimeFinanceData.stockNews(message.data.stock);
        break;
      case "companyStockOverview":
        result =
          process.env.ENV === "development"
            ? companyStockOverviewMock
            : await realTimeFinanceData.companyStockOverview(
                message.data.stock
              );
        break;
      case "companyIncomeStatement":
        result =
          process.env.ENV === "development"
            ? companyIncomeStatementMock
            : realTimeFinanceData.companyIncomeStatement({
                stock: message.data.stock,
                period: message.data.period,
              });
        break;
      case "companyCashFlow":
        result =
          process.env.ENV === "development"
            ? companyCashFlowMock
            : await realTimeFinanceData.companyCashFlow({
                stock: message.data.stock,
                period: message.data.period,
              });
        break;
      case "companyBalanceSheet":
        result =
          process.env.ENV === "development"
            ? companyBalanceSheetMock
            : await realTimeFinanceData.companyBalanceSheet({
                stock: message.data.stock,
                period: message.data.period,
              });
        break;

      default:
        throw new Error("Query type not supported");
    }

    parentPort?.postMessage(result);
  } catch (error) {
    parentPort?.postMessage({ error: JSON.stringify(error) });
  }
});
