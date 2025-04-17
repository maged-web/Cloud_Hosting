import { getArticles, getArticlesCount } from '@/apiCalls/articleApi';
import Pagination from '@/app/components/atricles/Pagination';
import { ARTICLE_PER_PAGE } from '@/utils/constant';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteArticleButton from './DeleteArticleButton';
interface AdminArticlesTableProps {
    searchParams: { pageNumber: string }
}
const AdminArticlesTable = async ({ searchParams: { pageNumber } }: AdminArticlesTableProps) => {
    const token = cookies().get('jwtToken')?.value || '';
    if (!token) redirect('/login');
    const payload = verifyTokenForPage(token);
    if (!payload || !payload.isAdmin) redirect('/');

    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await getArticlesCount();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <section className='p-5'>
            <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
            <table className='table w-full text-left'>
                <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
                    <tr>
                        <th className='p-1 lg:p-2'>Title</th>
                        <th className='hidden lg:inline-block'>Created At</th>
                        <th >Actions</th>
                        <th className='hidden lg:inline-block'></th>
                    </tr>

                </thead>
                <tbody>{articles.map(article => (
                    <tr key={article.id} className='border-b border-t border-gray-300'>
                        <td className='p-3 text-gray-700'>{article.title}</td>
                        <td className='hidden lg:inline-block p-3 font-normal text-gray-700'>{new Date(article.createdAt).toDateString()}</td>
                        <td className='p-3'><Link className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition" href={`/admin/articles-table/edit/${article.id}`}>Edit</Link>
                            <DeleteArticleButton articleId={article.id} /></td>
                        <td className="hidden lg:inline-block p-3">
                            <Link
                                href={`/articles/${article.id}`}
                                className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                            >
                                Read More
                            </Link>
                        </td>
                    </tr>
                ))}</tbody>
            </table>
            <Pagination pageNumber={parseInt(pageNumber)} route="admin/articles-table" pages={pages} />
        </section>
    )
}

export default AdminArticlesTable
