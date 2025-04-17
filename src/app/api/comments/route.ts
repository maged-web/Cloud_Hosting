import { prisma } from "@/utils/db";
import { createCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/comments
 * @description Create new comment 
 * @access private
 * */
export async function  POST(request:NextRequest)
{
    try 
    {

        const user =verifyToken(request)
        if(!user)
        {
            return NextResponse.json({message:"You must login first"},{status:401})
        }
        const body = await request.json() as createCommentDto;
        const validation =createCommentSchema.safeParse(body);
        if(validation.error)
        {
            return NextResponse.json({message:validation.error.errors[0].message},{status:400})
        }
        const newComment = await prisma.comment.create({
            data:{
                text:body.text,
                userId:user.id,
                articleId:body.articleId
            }
        })
        return NextResponse.json({newComment,status:201});
    }catch (error) 
    {
        return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}



/**
 * @method GET
 * @route ~/api/comments
 * @description Get all comment 
 * @access private
 * */

export async function  GET(request:NextRequest)
{
    try 
    {
        const user = verifyToken(request);
        if(!user || user.isAdmin===false)
        {
            return NextResponse.json({message:"Only admins can see comments"},{status:403})
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments,{status:200});
    }catch (error) 
    {
        return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}