// Import statements remain the same
import { useState } from "react";
import { grayscale, degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");

import fontkit from "@pdf-lib/fontkit";
async function CreatR01(props: {
  formData: { [key: string]: { value: any; x: number; y: number } };
}) {
  const { formData } = props;
  const url = "/R01.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontUrl = "/THSarabun.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const THSarabunFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const filteredFormData = Object.fromEntries(
    Object.entries(formData).filter(
      ([fieldName]) =>
        fieldName !== "prefix" &&
        fieldName !== "educationLevel" &&
        fieldName !== "date"
    )
  );

  Object.entries(filteredFormData).forEach(([fieldName, { value, x, y }]) => {
    firstPage.drawText(value.toString(), {
      x: x,
      y: height - y,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  });

  const formattedDate = dayjs(formData["date"]?.value).format("DD MMMM BBBB");
  let dayPart, monthPart, yearPart;

  if (formattedDate) {
    [dayPart, monthPart, yearPart] = formattedDate.split(" ");
    // Draw day part
    firstPage.drawText(dayPart, {
      x: 346,
      y: height - 131,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw month part
    firstPage.drawText(monthPart, {
      x: 400, // Adjust the x-coordinate as needed
      y: height - 131,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw era part
    firstPage.drawText(yearPart, {
      x: 480, // Adjust the x-coordinate as needed
      y: height - 131,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }

  // Check the value of the "prefix" field and draw lines accordingly
  const prefixFieldValue = formData["prefix"]?.value;
  if (prefixFieldValue === "นางสาว") {
    firstPage.drawLine({
      start: { x: 122, y: height - 213 },
      end: { x: 122 + 38, y: height - 213 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (prefixFieldValue === "นาย") {
    firstPage.drawLine({
      start: { x: 140, y: height - 213 },
      end: { x: 140 + 50, y: height - 213 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (prefixFieldValue === "นาง") {
    firstPage.drawLine({
      start: { x: 122, y: height - 213 },
      end: { x: 122 + 18, y: height - 213 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
    firstPage.drawLine({
      start: { x: 190, y: height - 213 },
      end: { x: 190 - 30, y: height - 213 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  }

  const educationLevelFieldValue = formData["educationLevel"]?.value;

  if (educationLevelFieldValue === "ปวช") {
    firstPage.drawLine({
      start: { x: 137, y: height - 243 },
      end: { x: 137 + 11, y: height - (243 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปวส") {
    firstPage.drawLine({
      start: { x: 212, y: height - 243 },
      end: { x: 212 + 11, y: height - (243 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปตรี") {
    firstPage.drawLine({
      start: { x: 279, y: height - 243 },
      end: { x: 279 + 11, y: height - (243 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปโท") {
    firstPage.drawLine({
      start: { x: 363, y: height - 243 },
      end: { x: 363 + 11, y: height - (243 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปเอก") {
    firstPage.drawLine({
      start: { x: 451, y: height - 243 },
      end: { x: 451 + 11, y: height - (243 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  }

  const fullNameFieldValue = formData["fullName"]?.value;

  if (prefixFieldValue) {
    const combinedValue = `${prefixFieldValue} ${fullNameFieldValue || ""}`;

    firstPage.drawText(combinedValue, {
      x: 332,
      y: height - 428,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(fullNameFieldValue, {
      x: 350,
      y: height - 408,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }

  // Additional modifications...

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfBlobUrl = URL.createObjectURL(pdfBlob);

  window.open(pdfBlobUrl, "_blank");
}

export { CreatR01 };
