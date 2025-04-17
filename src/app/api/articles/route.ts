import { ARTICLE_PER_PAGE } from "@/utils/constant";
import {prisma} from "@/utils/db";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method GET
 * @route ~/api/articles
 * @description Get Aticles By Page Number
 * @access public
 * @param {NextRequest} request
 * @returns {NextResponse}
 * */
export async function GET(request:NextRequest)
{
    try{
        const pageNumber=request.nextUrl.searchParams.get("pageNumber") || "1";
        const articles = await prisma.article.findMany(
            {take:ARTICLE_PER_PAGE,skip:ARTICLE_PER_PAGE*(parseInt(pageNumber)-1),orderBy:{createdAt:"desc"}});
        return NextResponse.json(articles,{status:200});
    }catch(error)
    {
        return NextResponse.json({message:"Internal server error"},{status:500})

    }
   // return NextResponse.json({message: "Hello World",articles,status:200});
}


/**
 * @method POST
 * @route ~/api/articles
 * @description Create new article 
 * @access private
 * */
export async function  POST(request:NextRequest)
{
    try{
        const user = verifyToken(request);
        if(!user || user.isAdmin===false)
        {
            return NextResponse.json({message:"Only admins can create articles"},{status:403})
        }
   const body= (await request.json()) as CreateArticleDto;    
    console.log(body)
    
   const validation = createArticleSchema.safeParse(body);
    if(validation.error)
    {
        return NextResponse.json({message:validation.error.errors[0].message},{status:400})   
    }
    const newArticle : Article = await prisma.article.create({
        data:{
            title:body.title,
            description:body.description
        }

    })
    return NextResponse.json({newArticle,status:201});
}
    catch(error)
    {
        return NextResponse.json({message:"Internal server error"},{status:500})
    };
}