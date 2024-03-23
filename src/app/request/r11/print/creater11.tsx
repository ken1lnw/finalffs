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
async function CreatR11(props: any) {
  // const { formData } = props;
  // console.log(props.fullName)
  const url = "/R11.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontUrl = "/THSarabun.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const THSarabunFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const docid = `รหัสคำร้อง : ${props.createdDocs}`
  firstPage.drawText(docid, {
    x: 27,
    y: height - 807,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  const formattedDate = dayjs(props.date).format("DD MMMM BBBB");
  let dayPart, monthPart, yearPart;

  if (formattedDate) {
    [dayPart, monthPart, yearPart] = formattedDate.split(" ");
    // Draw day part
    firstPage.drawText(dayPart, {
      x: 357,
      y: height - 117,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw month part
    firstPage.drawText(monthPart, {
      x: 400, // Adjust the x-coordinate as needed
      y: height - 117,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw era part
    firstPage.drawText(yearPart, {
      x: 471, // Adjust the x-coordinate as needed
      y: height - 117,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    ////ข้างล่างลงชื่อ

    firstPage.drawText(dayPart, {
      x: 379,
      y: height - 528,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw month part
    firstPage.drawText(monthPart, {
      x: 407, // Adjust the x-coordinate as needed
      y: height - 528,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw era part
    firstPage.drawText(yearPart, {
      x: 449, // Adjust the x-coordinate as needed
      y: height - 528,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }

  firstPage.drawText(props.toWhom, {
    x: 125,
    y: height - 151,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.fullName, {
    x: 198,
    y: height - 183,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.studentID, {
    x: 435,
    y: height - 183,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  // Check the value of the "prefix" field and draw lines accordingly
  const prefixFieldValue = props.prefix;
  if (prefixFieldValue === "นางสาว") {
    firstPage.drawLine({
      start: { x: 159, y: height - 183 },
      end: { x: 159 - 38, y: height - 183 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (prefixFieldValue === "นาย") {
    firstPage.drawLine({
      start: { x: 139, y: height - 183 },
      end: { x: 139 + 50, y: height - 183 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (prefixFieldValue === "นาง") {
    firstPage.drawLine({
      start: { x: 142, y: height - 183 },
      end: { x: 142 - 18, y: height - 183 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
    firstPage.drawLine({
      start: { x: 159, y: height - 183 },
      end: { x: 159 + 30, y: height - 183 },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  }

  const educationLevelFieldValue = props.educationLevel;

  if (educationLevelFieldValue === "ปวช") {
    firstPage.drawLine({
      start: { x: 129, y: height - 208 },
      end: { x: 129 + 11, y: height - (208 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปวส") {
    firstPage.drawLine({
      start: { x: 218, y: height - 208 },
      end: { x: 218 + 11, y: height - (208 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปริญญาตรี") {
    firstPage.drawLine({
      start: { x: 293, y: height - 208 },
      end: { x: 293 + 11, y: height - (208 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปริญญาโท") {
    firstPage.drawLine({
      start: { x: 389, y: height - 208 },
      end: { x: 389 + 11, y: height - (208 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  } else if (educationLevelFieldValue === "ปริญญาเอก") {
    firstPage.drawLine({
      start: { x: 480, y: height - 208 },
      end: { x: 480 + 11, y: height - (208 - 10) },
      thickness: 2,
      color: rgb(0, 0, 1),
      opacity: 0.75,
    });
  }

  const fullNameFieldValue = props.fullName;

  if (prefixFieldValue) {
    const combinedValue = `${prefixFieldValue} ${fullNameFieldValue || ""}`;

    firstPage.drawText(fullNameFieldValue, {
      x: 359,
      y: height - 493,
      size: 12,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(combinedValue, {
      x: 369,
      y: height - 512,
      size: 12,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  }


  firstPage.drawText(props.faculty, {
    x: 74,
    y: height - 233,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.major, {
    x: 348,
    y: height - 233,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.contactNumber, {
    x: 92,
    y: height - 497,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.email, {
    x: 87,
    y: height - 511,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.semester, {
    x: 315,
    y: height - 270,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.academicYear, {
    x: 414,
    y: height - 270,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });




  firstPage.drawText(props.studentCourseCode, {
    x: 34,
    y: height - 365,
    size: 10,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.studentCourseTitle, {
    x: 92,
    y: height - 365,
    size: 8,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.studentCourseCredit, {
    x: 255,
    y: height - 365,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  

  






  firstPage.drawText(props.structureCourseCode, {
    x: 281,
    y: height - 365,
    size: 10,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.structureCourseTitle, {
    x: 339,
    y: height - 365,
    size: 8,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.structureSection, {
    x: 473,
    y: height - 365,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.professor, {
    x: 521,
    y: height - 365,
    size: 8,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  // Additional modifications...

  const pdfBytes = await pdfDoc.save();
  const formData = new FormData();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  formData.append("file", pdfBlob, `${props.createdDocs}.pdf`);

  // Make a POST request to your server to upload the file using fetch
  try {
    await fetch("/api/uploadpdf", {
      method: "POST",
      body: formData,
    });

    console.log("File uploaded successfully");
    alert("สร้างไฟล์คำร้องสำเร็จ")
  } catch (error) {
    alert("สร้างไฟล์คำร้องไม่สำเร็จ")
    console.error("Error uploading file:", error);
  }



  const pdfBlobUrl = URL.createObjectURL(pdfBlob);

  // const pdfBytes = await pdfDoc.save();
  // const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  // const pdfBlobUrl = URL.createObjectURL(pdfBlob);

  // window.open(pdfBlobUrl, "_blank");



}

export { CreatR11 };
