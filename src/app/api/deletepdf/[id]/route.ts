const fs = require('fs').promises;
const path = require('path');
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req:Request,{params}:any) {
  const id = params.id;
  try {
    await fs.unlink(`public/docsign/${id}.pdf`)
    return NextResponse.json({message:`File ${id} Deleted Success`}, { status: 200 })
      
  } catch (error) {
    return NextResponse.json({ error: 'ERROR CANT DELETE File' }, { status: 500 })
  }
}
