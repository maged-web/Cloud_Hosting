import { getSingleArticle } from '@/apiCalls/articleApi';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import EditArticleForm from './EditArticleForm';
interface EditArticlePageProps {
    params: { id: string }
}
const EditArticlePage = async ({ params }: EditArticlePageProps) => {
    const token = cookies().get('jwtToken')?.value || '';
    if (!token) redirect('/login');
    const payload = verifyTokenForPage(token);
    if (!payload || !payload.isAdmin) redirect('/');
    const article: Article = await getSingleArticle(params.id);

    return (
        <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
            <div className='shadow p-4 bg-purple-200 rounded w-full'>
                <h2 className='text-2xl text-green-700 font-semibold mb-4'>
                    Edit Article
                </h2>
                <EditArticleForm article={article} />
            </div>
        </section>
    )
}

export default EditArticlePage
