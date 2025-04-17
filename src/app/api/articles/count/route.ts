/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get articles count
 * @access public
 */

import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({ count},{ status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}