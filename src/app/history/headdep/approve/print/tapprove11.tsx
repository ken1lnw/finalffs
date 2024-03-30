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
async function HeadDepApproveR11(props:any) {
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

  firstPage.drawText(props.headDepartmentComment, {
    x: 56,
    y: height - 685,
    size: 14,
    font: THSarabunFont,
    color: rgb(0, 0, 1),
  });

  const name = props.headDepartmentName;
  const lname = props.headDepartmentLastName;
  const prefix = props.headDepartmentPrefix;

  const fullname = `${name} ${lname}`;
  const pfullname = `${prefix} ${fullname}`;
  const signPath = props.signPath;


  if(signPath && signPath !== "" || signPath !== null)
  {
   const pngUrl = `/sign/${signPath}`
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
    
    const pngImage = await pdfDoc.embedPng(pngImageBytes)
    // const jpgDims = pngImage.scale(0.5)
      
    firstPage.drawImage(pngImage, {
      x: 161,
      y: height - 610,
      width: 50,
      height: 20,
    })
  
    // firstPage.drawImage(pngImage, {
    //   x: 161,
    //   y: height - 721,
    //   width: 50,
    //   height: 20,
    // })
  
    // firstPage.drawImage(pngImage, {
    //   x: 435,
    //   y: height - 722,
    //   width: 50,
    //   height: 20,
    // })
  
  }
  
  else{
  
  
    firstPage.drawText(fullname, {
      x: 139,
      y: height - 721,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });
  
  }
  

  // firstPage.drawText(fullname, {
  //   x: 139,
  //   y: height - 721,
  //   size: 14,
  //   font: THSarabunFont,
  //   color: rgb(0, 0, 1),
  // });


  // firstPage.drawText(pfullname, {
  //   x: 115,
  //   y: height - 710,
  //   size: 14,
  //   font: THSarabunFont,
  //   color: rgb(0, 0, 1),
  // });

 
  const formattedDate = props.headDepartmentDate;
  let dayPart, monthPart, yearPart;

  if (formattedDate) {
    [dayPart, monthPart, yearPart] = formattedDate.split(" ");
    // Draw day part
    firstPage.drawText(dayPart, {
      x: 122,
      y: height - 737,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw month part
    firstPage.drawText(monthPart, {
      x: 144, // Adjust the x-coordinate as needed
      y: height - 737,
      size: 14,
      font: THSarabunFont,
      color: rgb(0, 0, 1),
    });

    // Draw era part
    firstPage.drawText(yearPart, {
      x: 225, // Adjust the x-coordinate as needed
      y: height - 737,
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

  // window.open(pdfBlobUrl, "_blank");
  
}

export { HeadDepApproveR11 };
