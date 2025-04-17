"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ButtonSpinner from '@/app/components/ButtonSpinner'
import { LOCAL_DOMAIN } from '@/utils/constant'
const RegisterForm = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!userName || !email || !password) {
            toast.error("Please enter user name , email and password");
            return;
        }
        try {
            setLoading(true)
            axios.post(`${LOCAL_DOMAIN}/users/register`, { email, password, userName })
            router.replace('/')
            setLoading(false)
            router.refresh();
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
            console.log(err)
            setLoading(false)

        }
    }
    return (
        <form className='flex flex-col' onSubmit={formSubmitHandler}>
            <input type="text" placeholder='Enter Your User Name' value={userName} onChange={(e) => setUserName(e.target.value)} className="mb-4 border rounded p-2 text-xl" />

            <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded p-2 text-xl" />
            <button type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">{loading ? <ButtonSpinner /> : "Register"}</button>
        </form>
    )
}

export default RegisterForm
