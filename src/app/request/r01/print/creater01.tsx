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
async function CreatR01(props:any) {
  // const { formData } = props;
  console.log(props)
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

  const docid = `รหัสคำร้อง : ${props.createdDocs}`
  firstPage.drawText(docid, {
    x: 30,
    y: height - 791,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.subject, {
    x: 80,
    y: height - 160,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.toWhom, {
    x: 80,
    y: height - 185,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });



  firstPage.drawText(props.fullName, {
    x: 196,
    y: height - 214,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  firstPage.drawText(props.studentID, {
    x: 464,
    y: height - 214,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.faculty, {
    x: 71,
    y: height - 268,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });
  firstPage.drawText(props.major, {
    x: 354,
    y: height - 268,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });



  firstPage.drawText(props.intention, {
    x: 145,
    y: height - 305,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });


  firstPage.drawText(props.contactNumber, {
    x: 98,
    y: height - 424,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });
  firstPage.drawText(props.email, {
    x: 91,
    y: height - 438,
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
  const prefixFieldValue = props.prefix;
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

  const educationLevelFieldValue = props.educationLevel;

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

  const fullNameFieldValue = props.fullName;

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
  // const jpgUrl = `/sign/${props.signPath}`
  // const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
  
  // const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
  // const jpgDims = jpgImage.scale(0.5)
    
  // firstPage.drawImage(jpgImage, {
  //   x: 150,
  //   y: height - 541,
  //   width: 50,
  //   height: 20,
  // })

  // firstPage.drawImage(jpgImage, {
  //   x: 150,
  //   y: height - 690,
  //   width: 50,
  //   height: 20,
  // })

  // firstPage.drawImage(jpgImage, {
  //   x: 408,
  //   y: height - 692,
  //   width: 50,
  //   height: 20,
  // })


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

  // window.open(pdfBlobUrl, "_blank");
  
}

export { CreatR01 };
