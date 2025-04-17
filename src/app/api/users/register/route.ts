import { prisma } from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { RegisterSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { JWTPayload } from "@/utils/types";
import {  SetCookie } from "@/utils/generateTokens";


/**
 * @method POST
 * @route ~api/users/register
 * @desc Create New User
 * @access public
 */
export  async function POST(request: NextRequest) {
    try
    {
        const body = await request.json() as RegisterUserDto;
        const validation = RegisterSchema.safeParse(body);
        if(!validation.success)
        {
            return NextResponse.json({message:validation.error.errors[0].message},{status:400})
        }
        const user = await prisma.user.findUnique({where:{email:body.email}});
        if(user)
        {   
            return NextResponse.json({message:"User already exists"},{status:409})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password,salt);

        const newUser = await prisma.user.create({
            data:{
                userName:body.userName,
                email:body.email,
                password:hashedPassword
            },
            select:{
                id:true,
                userName:true,
                email:true,
                isAdmin:true
            }
        });
         const jwtPayLoad : JWTPayload={id:newUser.id,isAdmin:newUser.isAdmin,username:newUser.userName};
        const cookie = SetCookie(jwtPayLoad);
        return NextResponse.json({...newUser,message:"User created successfully"},{status:201,headers:{'Set-Cookie':cookie}});

    }catch(error)
    {
     return NextResponse.json({message:"Internal server error"},{status:500})   
    }

}