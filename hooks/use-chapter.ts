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
  const response = await fetch(
    `https://manga-scraper.hostinger.fourleaves.studio/api/v1/chapters/${provider}/${webtoon}/${chapter}`,
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
