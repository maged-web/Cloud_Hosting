import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import  jwt  from "jsonwebtoken";

export function verifyToken(request:NextRequest) : JWTPayload|null{
    try {
        const jwtToken=request.cookies.get('jwtToken');
        const authToken=jwtToken?.value as string;
        if(!authToken) return null;
        const userPayLoad=jwt.verify(authToken, process.env.JWT_SECRET as string) as JWTPayload;
        return userPayLoad;
    }catch (error) {
     return null;   
    }
}

export function verifyTokenForPage(token:string) : JWTPayload|null{
    try {
        const userPayLoad=jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        if(!userPayLoad) return null;
        return userPayLoad;
    }catch (error) {
     return null;   
    }
}