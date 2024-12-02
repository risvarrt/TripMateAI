const PDFDocument = require("pdfkit");

exports.generatePDF = async (itinerary) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      doc.fontSize(16).text(itinerary, { align: "left" });
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
