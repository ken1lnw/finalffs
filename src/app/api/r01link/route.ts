// import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextResponse } from 'next/server';
 

 
// export async function GET(){
//   return NextResponse.json({
//     hello: "world",
//   });


// }



// export async function GET(request:NextApiRequest) {
 
//   // external file URL
//     const pdfUrl = 'https://dev.cpe.rmuti.ac.th/fss/rfile/r01.pdf';

//     // use fetch to get a response
//     const response = await fetch(pdfUrl);

//     // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
//     return new Response(response.body, {
//         // responseType: 'arraybuffer',
//         headers: {
//             'Content-Type': 'application/pdf',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         },
//     });
// }