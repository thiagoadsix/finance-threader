import { parentPort } from "worker_threads";

import { RealTimeFinanceData } from "../api/real-time-finance-data.api";

parentPort?.on("message", async (message) => {
  console.log("Message from parent port", JSON.stringify(message));

  const realTimeFinanceData = new RealTimeFinanceData();

  try {
    let result;

    switch (message.queryType) {
      case "stockQuote":
        result = await realTimeFinanceData.stockQuote("AAPL:NASDAQ");
        break;
      case "stockNews":
        result = await realTimeFinanceData.stockNews("AAPL:NASDAQ");
        break;
      case "companyStockOverview":
        result = await realTimeFinanceData.companyStockOverview("AAPL:NASDAQ");
        break;
      case "companyIncomeStatement":
        result = realTimeFinanceData.companyIncomeStatement({
          stock: "AAPL:NASDAQ",
          period: "annual",
        });
        break;
      case "companyCashFlow":
        result = await realTimeFinanceData.companyCashFlow({
          stock: "AAPL:NASDAQ",
          period: "annual",
        });
        break;
      case "companyBalanceSheet":
        result = await realTimeFinanceData.companyBalanceSheet({
          stock: "AAPL:NASDAQ",
          period: "annual",
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
