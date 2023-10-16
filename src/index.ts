import "dotenv/config";

import { Worker } from "worker_threads";
import path from "path";

const runQueryInWorker = async (queryType: string, stock: string) => {
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

    worker.postMessage({ queryType, stock });
  });
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onEventTriggered = async (stock: string) => {
  try {
    const results = await Promise.all([
      runQueryInWorker("stockQuote", stock),
      runQueryInWorker("stockNews", stock),
      runQueryInWorker("companyStockOverview", stock),
      runQueryInWorker("companyIncomeStatement", stock),
      runQueryInWorker("companyCashFlow", stock),
      runQueryInWorker("companyBalanceSheet", stock),
    ]);

    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

const stockTickerReceived = "AAPL";
onEventTriggered(stockTickerReceived);
