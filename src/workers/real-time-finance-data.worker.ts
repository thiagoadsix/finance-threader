import { parentPort } from "worker_threads";

import { RealTimeFinanceData } from "../api/real-time-finance-data";

import stockQuoteMock from "./mocked/stock-quote.mock";
import stockNewsMock from "./mocked/stock-news.mock";
import companyStockOverviewMock from "./mocked/company-stock-overview.mock";
import companyIncomeStatementMock from "./mocked/company-income-statement.mock";
import companyCashFlowMock from "./mocked/company-cash-flow.mock";
import companyBalanceSheetMock from "./mocked/company-balance-sheet.mock";

parentPort?.on("message", async (message) => {
  console.log(
    "Message from parent port (real time finance data worker)",
    JSON.stringify(message)
  );

  const realTimeFinanceData = new RealTimeFinanceData();

  try {
    let result;

    switch (message.queryType) {
      case "stockQuote":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...stockQuoteMock }
            : await realTimeFinanceData.stockQuote(message.data.stock);
        break;
      case "stockNews":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...stockNewsMock }
            : await realTimeFinanceData.stockNews(message.data.stock);
        break;
      case "companyStockOverview":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...companyStockOverviewMock }
            : await realTimeFinanceData.companyStockOverview(
                message.data.stock
              );
        break;
      case "companyIncomeStatement":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...companyIncomeStatementMock }
            : realTimeFinanceData.companyIncomeStatement({
                stock: message.data.stock,
                period: message.data.period,
              });
        break;
      case "companyCashFlow":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...companyCashFlowMock }
            : await realTimeFinanceData.companyCashFlow({
                stock: message.data.stock,
                period: message.data.period,
              });
        break;
      case "companyBalanceSheet":
        result =
          process.env.ENV === "development"
            ? { from: message.queryType, ...companyBalanceSheetMock }
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
