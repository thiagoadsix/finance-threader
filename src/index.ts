import "dotenv/config";

import { Worker } from "worker_threads";
import path from "path";

const runQueryInWorker = async (queryType: string, data: any) => {
  return new Promise((resolve, reject) => {
    const workerFilePath = path.resolve(
      __dirname,
      "./workers/real-time-finance-data.worker"
    );
    const worker = new Worker(workerFilePath);

    worker.on("message", (result) => {
      resolve(result);
      worker.terminate();
    });

    worker.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    worker.postMessage({ queryType, data });
  });
};

const onEventTriggered = async (data: any) => {
  try {
    const results = await Promise.all([
      runQueryInWorker("stockQuote", data),
      runQueryInWorker("stockNews", data),
      runQueryInWorker("companyStockOverview", data),
      runQueryInWorker("companyIncomeStatement", data),
      runQueryInWorker("companyCashFlow", data),
      runQueryInWorker("companyBalanceSheet", data),
    ]);

    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

const stockTickerReceived = {
  stock: "AAPL:NASDAQ",
  period: "annual",
};
onEventTriggered(stockTickerReceived);
