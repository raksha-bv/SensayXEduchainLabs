
import { getTotalUsers } from '@/lib/userService';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const activeStudents = await getTotalUsers();
    if (!activeStudents) {
        return NextResponse.json(
            { success: false, error: "No active students found" },
            { status: 404 }
        );
    }
    return NextResponse.json(
        { success: true, activeStudents },
        { status: 200 }
    )
}

