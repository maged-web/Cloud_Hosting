"use client"
import { LOCAL_DOMAIN } from '@/utils/constant'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddArticleForm = () => {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title || !description) {
            return toast.error("Please enter title and description");
        }
        try {
            await axios.post(`${LOCAL_DOMAIN}/articles`, { title, description });
            setTitle('');
            setDescription('');
            toast.success("Article added successfully");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
    return (
        <form className='flex flex-col' onSubmit={formSubmitHandler}>
            <input type="text" placeholder='Enter Your Article Title' value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <textarea placeholder='Enter Your Article Description' value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <button type="submit" className="text-2xl text-white bg-blue-700 p-2 rounded-lg font-bold hover:bg-blue-900">Add</button>
        </form>
    )
}

export default AddArticleForm
