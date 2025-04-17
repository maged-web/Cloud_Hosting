"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ButtonSpinner from '@/app/components/ButtonSpinner'
import { LOCAL_DOMAIN } from '@/utils/constant'
const LoginForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }
        try {
            setLoading(true)
            await axios.post(`${LOCAL_DOMAIN}/users/login`, { email, password });
            router.replace('/')
            setLoading(false)
            router.refresh();


        } catch (err: any) {
            console.log(err);
            toast.error(err?.response?.data?.message);
        }

    }
    return (
        <form className='flex flex-col' onSubmit={formSubmitHandler}>
            <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <button type="submit" disabled={loading} className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">{loading ? <ButtonSpinner /> : "Login"}</button>
        </form>
    )
}

export default LoginForm
