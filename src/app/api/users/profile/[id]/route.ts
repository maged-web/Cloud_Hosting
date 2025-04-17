import { prisma } from "@/utils/db";
import { updateUserDto } from "@/utils/dtos";
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { updateUserSchema } from "@/utils/validationSchema";
interface Props{
    params:{id:string}
}

/**
 * @method DELETE
 * @route ~api/users/profile/:id
 * @desc Delete Profile
 * @access private
 */

export async function DELETE(request:NextRequest,{params}:Props)
{
    try{
        const user =await prisma.user.findUnique({where:{id:parseInt(params.id)}})
        if(!user)
        {
            return NextResponse.json({message:"User not found"},{status:404})
        }
       // const authToken:string = request.headers.get('authToken') as string;
        
        const userFromToken=verifyToken(request);
        if(userFromToken && userFromToken.id===user.id)
        {
            await prisma.user.delete({where:{id:parseInt(params.id)}});
            return NextResponse.json({message:"Your account has been deleted"},{status:200})

        }
        return NextResponse.json({message:"Forbidden"},{status:403})
    }catch(error)
    {
     return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}

/**
 * @method GET
 * @route ~api/users/profile/:id
 * @desc Get Profile by id
 * @access private
 */

export async function GET(request:NextRequest,{params}:Props)
{
    try{
        const user =await prisma.user.findUnique({where:{id:parseInt(params.id)},include:{comments:true}});
        if(!user)
        {
            return NextResponse.json({message:"User not found"},{status:404})
        }
        const userFromToken=verifyToken(request);
        if(!userFromToken || userFromToken.id!==user.id)
        {
            return NextResponse.json({message:"Forbidden"},{status:403})
        }
        const commentsIds=user.comments.map(comment=>comment.id);
        await prisma.comment.deleteMany({where:{id:{in:commentsIds}}})
        return NextResponse.json({user,status:200})
    }catch(error)
    {
     return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}


/**
 * @method PUT
 * @route ~api/users/profile/:id
 * @desc upate Profile
 * @access private
 */

export async function PUT(request:NextRequest,{params}:Props)
{
    try{
        const body = await request.json() as updateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if(validation.error)
        {
            return NextResponse.json({message:validation.error.errors[0].message},{status:400})
        }
        const user =await prisma.user.findUnique({where:{id:parseInt(params.id)}})
        if(!user)
        {
            return NextResponse.json({message:"User not found"},{status:404})
        }
        const userFromToken=verifyToken(request);
        if(!userFromToken || userFromToken.id!==user.id)
        {
            return NextResponse.json({message:"Forbidden"},{status:403})
        }
        if(body.password)
        {
          
            const salt = await bcrypt.genSaltSync(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        const updatedUser=await prisma.user.update({where:{id:parseInt(params.id)},data:body});
        const {password,...other}=updatedUser;
        return NextResponse.json({...other},{status:200})
    }catch(error)
    {
     return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}