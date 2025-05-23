import { Article } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ArticleItemProps {
    article: Article
}
const AtricleItem = ({ article }: ArticleItemProps) => {
    return (
        <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4" >
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1" key={article.id}>{article.title}</h3>
            <p className="text-xl font-bold text-gray-700 my-2 p-1 line-clamp-1">{article.description}</p>
            <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/articles/${article.id}`}>Read more</Link>
        </div>
    )
}

export default AtricleItem
