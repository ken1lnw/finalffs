import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const users = await prisma.user.findUnique(
            {
                where:{
                    userId: id,
                }
            }
        )
        return NextResponse.json({users}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })
    }

}


export async function PUT(req:Request,{params}:any) {
    const id = params.id;
    try {
        const datain = await req.json();
        const updateUser = await prisma.user.update({
            where: {
                userId: id,
            },
            data: datain,
        })
        const users = await prisma.user.findMany()
        return NextResponse.json({updateUser}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}


export async function DELETE(req:Request,{params}:any) {
    const id = params.id;
    try {
        const updateUser = await prisma.user.delete({
            where: {
                userId: id,
            },
        })
        const users = await prisma.user.findMany()
        return NextResponse.json({message:"delete success"}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT DELETE' }, { status: 500 })
    }

}