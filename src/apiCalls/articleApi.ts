import { Article } from '@prisma/client';
import {DOMAIN} from '@/utils/constant'
import { SingleArticle } from '@/utils/types';
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,{cache:'no-store'});
  if (!response.ok) throw new Error("Failed to fetch articles");

  return response.json();
}

export async function getArticlesCount(): Promise<number> {
    const response = await fetch(`${DOMAIN}/api/articles/count`,{cache:'no-store'});
    if (!response.ok) throw new Error("Failed to fetch articles count");
  
    const {count}= await response.json() as {count:number};
    return count;
  }
  export async function getArticlesBasedOnSearch(searchText: string): Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);
    if (!response.ok) throw new Error("Failed to fetch articles");
  
    return response.json();
  }
  export async function getSingleArticle(id: string): Promise<SingleArticle> {
     const response = await fetch(`${DOMAIN}/api/articles/${id}`,{cache:'no-store'});
     console.log(response);
        if (!response.ok) throw new Error("Failed to fetch article");
        const data = await response.json();
    return data.article;
  }
  