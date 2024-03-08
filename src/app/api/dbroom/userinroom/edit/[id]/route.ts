import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:any){
    const id = params.id;

    try {
        const users = await prisma.room.findUnique(
            {
                where:{
                    roomId: id,
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
        const room = await prisma.room.findUnique({
            where: {
                roomId: id,
            }
        })
        if(room){
            const duplicateStudents = datain.student.filter((studentId: string) => room.student.includes(studentId));
            if(duplicateStudents.length > 0){
                return NextResponse.json({ error: `Duplicate students: ${duplicateStudents.join(', ')}` }, { status: 400 })
            }
            const newStudents = [...room.student, ...datain.student];
            const updatedRoom = await prisma.room.update({
                where: {
                    roomId: id,
                },
                data: {
                    student: newStudents,
                },
            })
            return NextResponse.json({updatedRoom}, { status: 200 })
        } else {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 })
        }
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT PUT' }, { status: 500 })
    }

}



export async function DELETE(req:Request,{params}:any) {
    const id = params.id;
    try {
        const datain = await req.json();
        const room = await prisma.room.findUnique({
            where: {
                roomId: id,
            }
        })
        if(room){
            const newStudents = room.student.filter(studentId => !datain.student.includes(studentId));
            const updatedRoom = await prisma.room.update({
                where: {
                    roomId: id,
                },
                data: {
                    student: newStudents,
                },
            })
            return NextResponse.json({updatedRoom}, { status: 200 })
        } else {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 })
        }
        
    } catch (error) {
        return NextResponse.json({ error: 'ERROR CANT DELETE' }, { status: 500 })
    }

}
