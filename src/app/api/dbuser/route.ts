import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
    
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({users}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function POST(req:Request) {
    
    try {
        const datain = await req.json();
        const newUser = await prisma.user.create({
        data: datain
        })
        const users = await prisma.user.findMany()
        return NextResponse.json({newUser}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT POST' }, { status: 500 })
    }

}