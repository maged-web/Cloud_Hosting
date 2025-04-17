import { getArticlesBasedOnSearch } from "@/apiCalls/articleApi";
import AtricleItem from "@/app/components/atricles/AtricleItem";
import { Article } from "@prisma/client";

interface SearchArticlePageProps {
  searchParams: {
    searchText: string;
  }
}
export default async function Search({ searchParams: { searchText } }: SearchArticlePageProps) {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);
  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (<h2 className="text-2xl font-bold p-5 text-gray-800">No result found for <span className=" text-red-800">{searchText}</span></h2>) : (
        <>
          < h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Search Results for
            <span className="ms-1 text-green-700 text-3xl font-bold">{searchText}</span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((article) => (
              <AtricleItem article={article} />
            ))}
          </div>
        </>)}
    </section>
  )
}
