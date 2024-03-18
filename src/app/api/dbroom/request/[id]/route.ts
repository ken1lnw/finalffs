import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const request = await prisma.roomReqeust.findUnique(
            {
                where:{
                    id: id,
                }
            }
        )
        return NextResponse.json({request}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function PUT(req:Request,{params}:any) {
    const id = params.id;
    try {
        const datain = await req.json();
        const updateRequestRoom = await prisma.roomReqeust.update({
            where: {
                id: id,
            },
            data: datain,
        })
        return NextResponse.json({updateRequestRoom}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}


export async function DELETE(req:Request,{params}:any) {
    const id = params.id;
    try {
        const deleteRequestRoom = await prisma.roomReqeust.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json({message:"delete success"}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT DELETE' }, { status: 500 })
    }

}