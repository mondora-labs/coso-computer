import { PDFDocument, StandardFonts, rgb, fontkit } from "pdf-lib";

import pdfLetterDefault from "./assets/modulo-consegna.pdf";

const downloadPdf = (blob, fileName) => {
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  window.addEventListener("focus", e => URL.revokeObjectURL(link.href), {
    once: true
  });
};

const customSplit = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  var reg = new RegExp(".{1," + maxLength + "}", "g");
  var parts = str.match(reg);
  return parts.join("\n");
};

const createPdf = async item => {
  const existingPdfBytes = await fetch(pdfLetterDefault).then(res =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const HelveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pdfDoc.registerFontkit(fontkit);

  const pages = pdfDoc.getPages();
  const page = pages[0];

  const Luogo = "Berbenno di Valtellina";

  const black = rgb(0 / 255, 0 / 255, 0 / 255);
  const { height } = page.getSize();

  page.setFont(HelveticaFont);
  page.setFontColor(black);
  page.setFontSize(12);

  page.drawText(item.owner, {
    x: 160,
    y: height - 175
  });
  page.drawText(item.fiscalCode, {
    x: 160,
    y: height - 195
  });

  page.setFontSize(10);
  page.drawText(item.device, {
    x: 80,
    y: height - 500
  });
  page.drawText(customSplit(item.model, 22), {
    x: 190,
    y: height - 495,
    lineHeight: 13
  });
  page.drawText(item.serial, {
    x: 310,
    y: height - 500
  });

  page.setFontSize(11);
  page.drawText(Luogo, {
    x: 80,
    y: height - 650
  });
  page.drawText(item.dateFrom, {
    x: 80,
    y: height - 665
  });

  const fileName = "Consegna asset - " + item.owner;

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadPdf(blob, fileName);
};

export default createPdf;
