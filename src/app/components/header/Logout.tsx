"use client"
import { DOMAIN, LOCAL_DOMAIN } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { use } from 'react'

const Logout = () => {
    const router = useRouter()
    const logOutHandler = async () => {
        try {
            await axios.get(`${LOCAL_DOMAIN}/users/logout`);
            router.push('/login');
            router.refresh();
        } catch (err: any) {
            toast.warning("something went wrong");
            console.log(err);

        }
    }
    return (
        <button onClick={logOutHandler} className='bg-gray-700 text-gray-200 px-1 rounded'>
            Logout
        </button>
    )
}

export default Logout
