import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function POST(req:Request, res: NextApiResponse) {
    const students = await req.json(); // ตัวอย่างเช่น ["621721100411", "62231515144"]

    try {
        const users = await prisma.user.findMany({
            where: {
                userId: {
                    in: students.students
                }
            }
        })
        
  return NextResponse.json({users}, { status: 200 })

        
    } catch (error) {

        return NextResponse.json({ error: 'ERROR CANT GET' }, { status: 500 })

    }
}
