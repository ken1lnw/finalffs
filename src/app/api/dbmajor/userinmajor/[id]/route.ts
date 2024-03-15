import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const majors = await prisma.user.findMany(
            {
                where:{
                    major: id,
                }
            }
        )
        return NextResponse.json({majors}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function PUT(req:Request,{params}:any){
    const id = params.id;

    try {
        const updatedUsers = await prisma.user.updateMany(
            {
                where:{
                    major: id,
                },
                data: {
                    major: null,
                }
            }
        )
        return NextResponse.json({updatedUsers}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}


