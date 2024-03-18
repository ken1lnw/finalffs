import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
    
    try {
        const request = await prisma.roomReqeust.findMany()
        return NextResponse.json({request}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function POST(req:Request) {
    
    try {
        const datain = await req.json();
        const newRequest = await prisma.roomReqeust.create({
        data: datain
        })
        return NextResponse.json({newRequest}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT POST' }, { status: 500 })
    }

}