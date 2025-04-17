"use client";
import { DOMAIN, LOCAL_DOMAIN } from "@/utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from 'react-toastify'
interface AddCommentFormProps {
    articleId: number;
}
const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
    const router = useRouter();

    const [text, setText] = useState("");


    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            return toast.error("Please write a comment");
        }
        try {
            await axios.post(`${LOCAL_DOMAIN}/comments`, { text, articleId });
            router.refresh();
            setText("");
        }
        catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data.message);
        }
    };
    return (
        <form onSubmit={formSubmitHandler}>
            <input
                type="text"
                placeholder="Search for article"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 bg-white rounded-lg text-xl focus:shadow-md"
            />
            <button type="submit" className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'>
                Comment
            </button>        </form>
    );
};

export default AddCommentForm;
