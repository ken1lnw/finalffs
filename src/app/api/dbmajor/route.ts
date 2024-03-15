import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
    
    try {
        const majors = await prisma.major.findMany()
        return NextResponse.json({majors}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function POST(req:Request) {
    
    try {
        const datain = await req.json();

         // Check if a Major with the same MajorId already exists
         const existingMajor = await prisma.major.findUnique({
            where: {
                majorId: datain.majorId
            }
        });

        if (existingMajor) {
            // If the room already exists, return an error
            return NextResponse.json({ error: 'Major with this ID already exists' }, { status: 400 });
        } else {
            // If the room does not exist, create a new room
            const newMajor = await prisma.major.create({
                data: datain
            })
            return NextResponse.json({newMajor}, { status: 200 })
        }


        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT POST' }, { status: 500 })
    }

}
