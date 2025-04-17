

import { prisma } from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { LoginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { SetCookie } from "@/utils/generateTokens";
import { JWTPayload } from "@/utils/types";
/**
 * @method POST
 * @route ~api/users/login
 * @desc Login User
 * @access public
 */
export  async function POST(request: NextRequest) {
    try
    {
        const body = await request.json() as LoginUserDto;
        const validation = LoginSchema.safeParse(body);
        if(!validation.success)
        {
            return NextResponse.json({message:validation.error.errors[0].message},{status:400})
        }
        const user = await prisma.user.findUnique({where:{email:body.email}});
        if(!user)
        {   
            return NextResponse.json({message:"Invalid email or password"},{status:400})
        }
        const isPasswordMatched = await bcrypt.compare(body.password,user.password);
        if(!isPasswordMatched)
        {
            return NextResponse.json({message:"Invalid email or password"},{status:400})
        }
        const jwtPayLoad : JWTPayload={id:user.id,isAdmin:user.isAdmin,username:user.userName};
        const cookie = SetCookie(jwtPayLoad);
        return NextResponse.json({message:"Authenticated"},{status:200,headers:{'Set-Cookie':cookie}});   


    }catch(error)
    {
     return NextResponse.json({message:"Internal server error"},{status:500})   
    }

}