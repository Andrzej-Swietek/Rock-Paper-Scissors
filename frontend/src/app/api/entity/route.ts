import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
    const data = {message: "ok"}
    return NextResponse.json(data);

}
