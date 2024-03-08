import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
    
    try {
        const rooms = await prisma.room.findMany()
        return NextResponse.json({rooms}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function POST(req:Request) {
    
    try {
        const datain = await req.json();
        
        // Check if a room with the same roomId already exists
        const existingRoom = await prisma.room.findUnique({
            where: {
                roomId: datain.roomId
            }
        });

        if (existingRoom) {
            // If the room already exists, return an error
            return NextResponse.json({ error: 'Room with this ID already exists' }, { status: 400 });
        } else {
            // If the room does not exist, create a new room
            const newRoom = await prisma.room.create({
                data: datain
            })
            return NextResponse.json({newRoom}, { status: 200 })
        }
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}