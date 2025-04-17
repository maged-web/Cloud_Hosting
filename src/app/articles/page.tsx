import Link from "next/link";
import AtricleItem from "../components/atricles/AtricleItem";
import { Article } from "@prisma/client";
import { Metadata } from "next";
import SearchArticleInput from "../components/atricles/SearchArticleInput";
import Pagination from "../components/atricles/Pagination";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApi";
import { ARTICLE_PER_PAGE } from "@/utils/constant";

interface AtriclePageProps {
  searchParams: { pageNumber: string };
}


export default async function Articles({ searchParams }: AtriclePageProps) {
  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex  items-center justify-center flex-wrap gap-7 w-full">

        {articles.map((article) => (
          <AtricleItem article={article} key={article.id} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="articles" pages={pages} />
    </section>
  )
}
export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming",
};