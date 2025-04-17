import { text } from "body-parser";
import { z } from "zod";
export const createArticleSchema=z.object({
    title:z.string().min(2,"Title must be at least 2 characters").max(200),
    description:z.string().min(10,"Body must be at least 10 characters"),
})

export const RegisterSchema=z.object({
    userName:z.string().min(2,"Name must be at least 2 characters").max(100),
    email:z.string().email("Invalid email").min(3,"Email must be at least 3 characters").max(200),
    password:z.string().min(6,"Password must be at least 6 characters").max(200),
})

export const LoginSchema=z.object({
    email:z.string().email("Invalid email").min(3,"Email must be at least 3 characters").max(200),
    password:z.string().min(6,"Password must be at least 6 characters").max(200),
})

export const createCommentSchema=z.object({
    text:z.string().min(2,"Comment must be at least 2 characters").max(500),
    articleId:z.number(),
})

export const updateUserSchema=z.object({
    userName:z.string().min(2,"Name must be at least 2 characters").max(100).optional(),
    email:z.string().email("Invalid email").min(3,"Email must be at least 3 characters").max(200).optional(),
    password:z.string().min(6,"Password must be at least 6 characters").max(200).optional(),
})
