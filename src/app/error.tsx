"use client"

import Link from "next/link"
interface ErrorProps {
    error: Error;
    reset: () => void
}
const Error = ({ error, reset }: ErrorProps) => {
    return (
        <div className="pt-7 text-center">
            <div className="text-3xl text-red-600 font-semibold">
                Something went wrong
            </div>
            <h2 className="text-gray-700 my-3 text-xl">Error message: {error.message}</h2>
            <button onClick={() => reset()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Try again </button>
            <Link href={'/'} className="text-xl underline text-blue-700 block mt-6">Go to home page</Link>
        </div>
    )
}

export default Error
