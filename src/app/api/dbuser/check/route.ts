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


export async function POST(req: Request, res: NextApiResponse) {
    const object = await req.json();
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: object.id,
            },
        });

        if (user && user.name === object.name) {
            // res.status(200).json({ user });
           return NextResponse.json({user}, { status: 200 })
        } else {
            // NextResponse.status(404).json();
            return NextResponse.json({ error: 'User not found or name does not match' }, { status: 404 })

        }
    } catch (error) {
        // res.status(500).json({ error: 'Error checking user' });
        return NextResponse.json({ error: 'Error checking user' }, { status: 500 })

    }
}
