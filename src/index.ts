import "dotenv/config";

import { Worker } from "worker_threads";
import path from "path";

const runRealTimeFinanceDataWorker = async (queryType: string, data: any) => {
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

const runGeneratePdfWorker = async (data: any) => {
  return new Promise((resolve, reject) => {
    const workerFilePath = path.resolve(
      __dirname,
      "./workers/generate-pdf.worker"
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

    worker.postMessage({ data });
  });
};

const onEventTriggered = async (data: any) => {
  try {
    const results = await Promise.all([
      runRealTimeFinanceDataWorker("stockQuote", data),
      runRealTimeFinanceDataWorker("stockNews", data),
      runRealTimeFinanceDataWorker("companyStockOverview", data),
      runRealTimeFinanceDataWorker("companyIncomeStatement", data),
      runRealTimeFinanceDataWorker("companyCashFlow", data),
      runRealTimeFinanceDataWorker("companyBalanceSheet", data),
    ]);

    console.log(JSON.stringify(results));

    const pdfSections = results.map((item: any) => {
      return {
        header: item.from,
        data: item.data,
      };
    });

    const pdfResult: any = await runGeneratePdfWorker(pdfSections);
    require("fs").writeFileSync("output.pdf", pdfResult.pdfData);
    console.log("PDF generated successfully.");
  } catch (error) {
    console.error(error);
  }
};

const stockTickerReceived = {
  stock: "AAPL:NASDAQ",
  period: "annual",
};
onEventTriggered(stockTickerReceived);
