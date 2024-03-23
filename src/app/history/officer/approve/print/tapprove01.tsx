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
async function OfficerApproveR01(props:any) {
  // const { formData } = props;
  console.log(props)
  const url = `/docsign/${props.DocsId}.pdf`;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontUrl = "/THSarabun.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const THSarabunFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();



  const name = props.officerName;
  const lname = props.officerLastName;
  const prefix = props.officerPrefix;

  const fullname = `${name} ${lname}`;
  const pfullname = `${prefix} ${fullname}`;


  if (props.DocResult === "ดำเนินการแล้ว") {
    firstPage.drawLine({
      start: { x: 322, y: height - 680.6 },
      end: { x: 322 + 11, y: height - (680.6 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (props.DocResult === "ดำเนินการไม่ได้") {
    firstPage.drawLine({
      start: { x: 321, y: height - 669 },
      end: { x: 321 + 11, y: height - (669 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });

    firstPage.drawText(props.officerComments, {
      x: 409,
      y: height - 669,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }

 


  firstPage.drawText(fullname, {
    x: 412,
    y: height - 722,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  const formattedDate = props.officerDate;
  let dayPart, monthPart, yearPart;

  if (formattedDate) {
    [dayPart, monthPart, yearPart] = formattedDate.split(" ");
    // Draw day part
    firstPage.drawText(dayPart, {
      x: 398,
      y: height - 738,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw month part
    firstPage.drawText(monthPart, {
      x: 421, // Adjust the x-coordinate as needed
      y: height - 738,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw era part
    firstPage.drawText(yearPart, {
      x: 479, // Adjust the x-coordinate as needed
      y: height - 738,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }

 
  

  // Additional modifications...

  const pdfBytes = await pdfDoc.save();
  const formData = new FormData();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  formData.append("file", pdfBlob, `${props.DocsId}.pdf`);

  // Make a POST request to your server to upload the file using fetch
  try {
    await fetch("/api/uploadpdf", {
      method: "POST",
      body: formData,
    });

    console.log("File uploaded successfully");
    alert("บันทึกข้อมูลลงบนเอกสารคำร้องสำเร็จ")
  } catch (error) {
    alert("บันทึกข้อมูลลงบนเอกสารคำร้องไม่สำเร็จ")
    console.error("Error uploading file:", error);
  }



  const pdfBlobUrl = URL.createObjectURL(pdfBlob);

  window.open(pdfBlobUrl, "_blank");
  
}

export { OfficerApproveR01 };
