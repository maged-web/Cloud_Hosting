"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const SearchArticleInput = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/articles/search?searchText=${searchText}`);
    };
    return (
        <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
            <input
                type="text"
                placeholder="Search for article"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-3 rounded text-xl border-none text-gray-900"
            />
        </form>
    );
};

export default SearchArticleInput;
