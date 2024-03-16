import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const rooms = await prisma.room.findMany(
            {
                where:{
                    student: {
                        has: id,
                    }
                }
            }
        )
        return NextResponse.json({rooms}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}

