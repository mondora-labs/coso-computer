import React from "react";

import { navigate } from "@reach/router";

import { PDFDocument, StandardFonts, rgb, fontkit } from "pdf-lib";

import pdfLetterDefault from "./modulo_consegna.pdf";

const downloadPdf = pdfBytes => {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);
  navigate(blobUrl);
};

async function createPdf(item) {
  console.log(item);

  const existingPdfBytes = await fetch(pdfLetterDefault).then(res =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const JuraFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pdfDoc.registerFontkit(fontkit);

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const fontSize = 24;

  const textWidth = JuraFont.widthOfTextAtSize(item.owner, fontSize);

  const black = rgb(0 / 255, 0 / 255, 0 / 255);

  const { width, height } = page.getSize();
  const centerX = width / 2;
  const centerY = height / 2 - 250;
  page.setFont(JuraFont);
  page.setFontColor(black);
  page.drawText(item.owner,
    {
      x: centerX - textWidth / 2,
      y: centerY - 15
    });


  const pdfBytes = await pdfDoc.save();
  downloadPdf(pdfBytes);
}

export default createPdf;
