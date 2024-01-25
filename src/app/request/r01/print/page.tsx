// "use client";

// import { useState } from "react";
// import { grayscale, degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import fs from "fs";
// import path from "path";
// import fontkit from "@pdf-lib/fontkit";

// export default function PrintR01(props: {
//   formData: { [key: string]: { value: any; x: number; y: number } };
// }) {
//   const { formData } = props;

//   async function modifyPdf() {
//     const url = "/R01.pdf";
//     const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     pdfDoc.registerFontkit(fontkit);

//     const fontUrl = "/THSarabun.ttf"; // Adjust the path based on your project structure
//     const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
//     // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier);
//     const THSarabunFont = await pdfDoc.embedFont(fontBytes);
//     console.log(THSarabunFont);

//     const pages = pdfDoc.getPages();
//     const firstPage = pages[0];
//     const { width, height } = firstPage.getSize();
//     // firstPage.drawText("ควย!", {
//     //   x: 341,
//     //   y: height - 132,
//     //   size: 16,
//     //   font: THSarabunFont,
//     //   color: rgb(0.95, 0.1, 0.1),
//     // //   rotate: degrees(-45),
//     // });

//     // Loop through formData and draw text on the PDF for each key-value pair
//     // Object.entries(formData).forEach(([fieldName, { value, x, y }]) => {
//     //   firstPage.drawText(value.toString(), {
//     //     x: x,
//     //     y: height - y, // Flip the y-coordinate to match PDF coordinate system
//     //     size: 14,
//     //     font: THSarabunFont,
//     //     color: rgb(0, 0, 1), // Black color
//     //   });
//     // });


//     const filteredFormData = Object.fromEntries(
//       Object.entries(formData).filter(
//         ([fieldName]) => fieldName !== "prefix" && fieldName !== "educationLevel"
//       )
//     );
    
//     Object.entries(filteredFormData).forEach(([fieldName, { value, x, y }]) => {
//       firstPage.drawText(value.toString(), {
//         x: x,
//         y: height - y,
//         size: 14,
//         font: THSarabunFont,
//         color: rgb(0, 0, 1),
//       });
//     });

//     // firstPage.drawLine({
//     //   start: { x: 122, y: height - 213 },
//     //   end: { x: 122 + 38 , y: height - 213 },
//     //   thickness: 2,
//     //   color: rgb(0, 0, 1),
//     //   opacity: 0.75,
//     // })

//     // firstPage.drawLine({
//     //   start: { x: 140, y: height - 213 },
//     //   end: { x: 140 + 50 , y: height - 213 },
//     //   thickness: 2,
//     //   color: rgb(0, 0, 1),
//     //   opacity: 0.75,
//     // })


//     firstPage.drawLine({
//       start: { x: 122, y: height - 213 },
//       end: { x: 122 + 18 , y: height - 213 },
//       thickness: 2,
//       color: rgb(0, 0, 1),
//       opacity: 0.75,
//     })
//     firstPage.drawLine({
//       start: { x: 190, y: height - 213 },
//       end: { x: 190 - 30 , y: height - 213 },
//       thickness: 2,
//       color: rgb(0, 0, 1),
//       opacity: 0.75,
//     })



//     const pdfBytes = await pdfDoc.save();

//     // Create a blob from the PDF bytes
//     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

//     // Create a blob URL
//     const pdfBlobUrl = URL.createObjectURL(pdfBlob);

//     // Open the PDF in a new tab/window or display it in an iframe
//     window.open(pdfBlobUrl, "_blank");
//   }

//   // const handleSubmit = () => {
//   //   // Add your logic for form submission here using the state values
//   //   console.log({
//   //     formData,
//   //   });
//   // };

//   return (
//     <>
//       {/* <button
//         className="bg-green-500 rounded-lg h-10 my-6 col-span-12 "
//         onClick={modifyPdf}
//       >
//         ยื่นคำร้อง
//       </button> */}


  
//     </>
//   );
// }





export default function r01printpage() {
  return (
    <>
    
    </>
  );
}
