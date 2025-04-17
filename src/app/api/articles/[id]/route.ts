import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";


interface Props {
    params: {
        id: string;
    };
}
/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get single article by id
 * @access public
 */
export async function GET(request: NextRequest,{params}:Props) {
try{
    const article = await prisma.article.findUnique({where:{id:parseInt(params.id)},
    include:{comments:{include:{user:{select:{userName:true}}},orderBy:{createdAt:"desc"}}}});
    if(!article)
    {
        return NextResponse.json({message:"Article not found",status:404})
    }
    return NextResponse.json({article,status:200});
}
catch(error)
{
    return NextResponse.json({message:"Internal server error"},{status:500})
}
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Update article
 * @access private
 */
export async function PUT(request: NextRequest,{params}:Props) {
    try{
        const user = verifyToken(request);
        if(!user || user.isAdmin===false)
        {
            return NextResponse.json({message:"Only admins can update articles"},{status:403})
        }
    const article = await prisma.article.findUnique({where:{id:parseInt(params.id)}});
    if(!article)
    {
        return NextResponse.json({message:"Article not found",status:404})
    }
    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
        where:{id:parseInt(params.id)},
        data:{
            title:body.title,
            description:body.description
        }
    })
    return NextResponse.json({updatedArticle, status: 200 });
}
    catch(error)
    {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
    }

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Delete article
 * @access private
 */
export async function DELETE(request: NextRequest,{params}:Props) {
    try{
        const user = verifyToken(request);
        if(!user || user.isAdmin===false)
        {
            return NextResponse.json({message:"Only admins can update articles"},{status:403})
        }
    const article = await prisma.article.findUnique({where:{id:parseInt(params.id)},include:{comments:true}});
    if(!article)
    {
        return NextResponse.json({message:"Article not found",status:404})
    }
    await prisma.article.delete({where:{id:parseInt(params.id)}})
    const commentsIds:number[] = article?.comments.map(comment=>comment.id);
    await prisma.comment.deleteMany({where:{id:{in:commentsIds}}})
    return NextResponse.json({ message:"Article deleted", status: 200 });
}catch(error)
{
    return NextResponse.json({message:"Internal server error"},{status:500})
}
    }
