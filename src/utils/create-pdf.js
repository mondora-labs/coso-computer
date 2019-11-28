import { navigate } from "@reach/router";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import pdfLetterDefault from "./modulo_consegna.pdf";

const downloadPdf = pdfBytes => {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);
  navigate(blobUrl);
};

function customSplit(str, maxLength) {
  if (str.length <= maxLength) return str;
  var reg = new RegExp(".{1," + maxLength + "}", "g");
  var parts = str.match(reg);
  return parts;
}

async function createPdf(item) {
  const existingPdfBytes = await fetch(pdfLetterDefault).then(res =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const HelveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pdfDoc.registerFontkit(fontkit);

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const fontSize = 12;

  const Luogo =
    "Berbenno di Valtellina";

  const black = rgb(0 / 255, 0 / 255, 0 / 255);
  const { height } = page.getSize();

  page.setFont(HelveticaFont);
  page.setFontColor(black);
  page.setFontSize(12);

  page.drawText(item.owner, {
    x: 160,
    y: height - 175
  });
  page.drawText(item.CF, {
    x: 160,
    y: height - 195
  });

  page.setFontSize(10);
  page.drawText(item.device, {
    x: 80,
    y: height - 500
  });
  page.drawText(customSplit(item.model, 22).join("\n"), {
    x: 190,
    y: height - 498,
    lineHeight: 13
  });
  page.drawText(item.serial, {
    x: 310,
    y: height - 500,
  });

  page.setFontSize(11);
  page.drawText(Luogo, {
    x: 80,
    y: height - 650,
  });
  page.drawText(item.dateFrom, {
    x: 80,
    y: height - 665,
  });

  const pdfBytes = await pdfDoc.save();
  downloadPdf(pdfBytes);
}

export default createPdf;