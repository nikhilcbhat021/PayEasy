import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// This file is used when we expand the app to use databases, instead of query params.

/**
 * 
 * @param req - NextRequest
 * @param param1 - BankName
 * @returns Response.
 */
export async function GET(
    req: NextRequest,
    { params }: {params: Promise<{ bankName: string }>}
) {
    const body = await req.json();
    const { bankName } = await params;

    console.log(body);
    console.log(bankName);

    return new Response();
    // return new NextResponse({})
}

export async function POST(req: NextRequest) {
    const bankName = await req.json();
    redirect(`/app/${bankName}`);
}