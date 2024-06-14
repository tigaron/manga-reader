import { env } from "@/env.mjs";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

interface ChapterResponse {
  error: boolean;
  message: string;
  data: Chapter;
}

export interface Chapter {
  provider: string;
  series: string;
  slug: string;
  fullTitle: string;
  shortTitle: string;
  number: number;
  sourceURL: string;
  chapterNav: {
    nextSlug: string;
    nextURL: string;
    prevSlug: string;
    prevURL: string;
  };
  contentURLs: string[];
}

export async function fetchChapter(
  provider: string,
  webtoon: string,
  chapter: string,
) {
  const { getToken } = useAuth();
  const token = await getToken();
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chapters/${provider}/${webtoon}/${chapter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const result: ChapterResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as Chapter;
}

export function useChapter(provider: string, webtoon: string, chapter: string) {
  return useQuery({
    queryKey: ["chapter", provider, webtoon, chapter],
    queryFn: () => fetchChapter(provider, webtoon, chapter),
  });
}
