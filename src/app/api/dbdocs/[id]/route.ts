import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const docs = await prisma.documents.findUnique(
            {
                where:{
                    documentsId: id,
                }
            }
        )
        return NextResponse.json({docs}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function PUT(req:Request,{params}:any) {
    const id = params.id;
    try {
        const datain = await req.json();
        const updateDocs = await prisma.documents.update({
            where: {
                documentsId: id,
            },
            data: datain,
        })
        const users = await prisma.user.findMany()
        return NextResponse.json({updateDocs}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}


export async function DELETE(req:Request,{params}:any) {
    const id = params.id;
    try {
        const updateDocs = await prisma.documents.delete({
            where: {
                documentsId: id,
            },
        })
        return NextResponse.json({message:"delete success"}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT DELETE' }, { status: 500 })
    }

}