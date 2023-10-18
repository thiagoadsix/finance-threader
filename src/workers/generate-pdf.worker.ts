import { parentPort } from "worker_threads";
import PDFKit from "pdfkit";

parentPort?.on("message", async (message) => {
  console.log(
    "Message from parent port (generate pdf worker)",
    JSON.stringify(message)
  );

  try {
    const doc = new PDFKit({ size: "A4", margin: 32 });
    let buffers: any[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      parentPort?.postMessage({ pdfData });
    });

    const totalSections = message.data.length;
    message.data.forEach(
      (section: { header: string; data: any }, index: number) => {
        doc.fontSize(24).text(section.header, { align: "center" });

        Object.entries(section.data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item, itemIndex) => {
              doc.fontSize(10).text(`${key} ${itemIndex + 1}:`);
              Object.entries(item).forEach(([subKey, subValue]) => {
                doc.text(`  ${subKey}: ${subValue}`);
              });
            });
          } else {
            doc.fontSize(10).text(`${key}: ${value}`);
          }
        });

        if (index < totalSections - 1) {
          doc.addPage();
        }
      }
    );

    doc.end();
  } catch (error) {
    console.error(error);
    parentPort?.postMessage({ error: JSON.stringify(error) });
  }
});
