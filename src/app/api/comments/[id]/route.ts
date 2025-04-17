import { prisma } from "@/utils/db";
import { updateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props{params:{id:string};id:string}
/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description Update comment 
 * @access private
 * */

export async function  PUT(request:NextRequest,{params}:Props)
{
    try 
    {
        const comment = await prisma.comment.findUnique({where:{id:parseInt(params.id)}});
        if(!comment)
        {
            return NextResponse.json({message:"Comment not found"},{status:404})
        }
        const user =verifyToken(request)
        if(!user || user.id!==comment.userId)
        {
            return NextResponse.json({message:"You are not allowed to update this comment"},{status:403})
        }

        const body = await request.json() as updateCommentDto;

        const updatedComment=await prisma.comment.update({where:{id:parseInt(params.id)},data:{text:body.text}});
        return NextResponse.json({updatedComment,status:200});
    }catch (error)
    {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}



/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @description Delete comment 
 * @access private
 * */
export async function DELETE(request:NextRequest,{params}:Props)
{
    try 
    {
        const comment = await prisma.comment.findUnique({where:{id:parseInt(params.id)}});
        if(!comment)
        {
            return NextResponse.json({message:"Comment not found"},{status:404})
        }
        const user =verifyToken(request)
        if(!user)
        {
            return NextResponse.json({message:"You must login first"},{status:401})
        }

        if(user.isAdmin||user.id===comment.userId)
        {
            await prisma.comment.delete({where:{id:parseInt(params.id)}});
            return NextResponse.json({message:"Comment deleted",status:200});
        }
        return NextResponse.json({message:"You are not allowed to delete this comment"},{status:403});
    }catch (error)
    {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}
