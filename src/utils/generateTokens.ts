import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";


export function generateJWT(payload:JWTPayload) :string {

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    });
   
    return accessToken ;
}

export function SetCookie(jwtPayLoad:JWTPayload) :string {

    const token=generateJWT(jwtPayLoad);
    const cookie=serialize('jwtToken',token,{
        httpOnly:true,secure:process.env.NODE_ENV === 'production',sameSite:'strict',maxAge:60*60*24*30,path:'/'});
    
        return cookie;
}