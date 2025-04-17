export interface CreateArticleDto{
    title:string;
    description:string;
}

export interface UpdateArticleDto{
    title?:string;
    description?:string;
}

export interface RegisterUserDto{
    userName:string;
    email:string;
    password:string;
}

export interface LoginUserDto{
    email:string;
    password:string;
}

export interface updateUserDto{
    userName?:string;
    email?:string;
    password?:string;
}

export interface createCommentDto
{
    text:string;
    articleId:number
}

export interface updateCommentDto
{
    text:string;
}