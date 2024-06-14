import { useQuery } from "@tanstack/react-query";

import { Webtoon } from "./use-webtoons";

interface ListChapterResponse {
  error: boolean;
  message: string;
  data: ListChapterData;
}

interface ListChapterData {
  series: Webtoon;
  chapters: ListChapter[];
}

export interface ListChapter {
  provider: string;
  series: string;
  slug: string;
  shortTitle: string;
  number: number;
}

export async function fetchChapterList(provider: string, webtoon: string) {
  const response = await fetch(
    `https://manga-scraper.hostinger.fourleaves.studio/api/v1/chapters/${provider}/${webtoon}/_list`,
  );
  const result: ListChapterResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as ListChapterData;
}

export function useChapterList(provider: string, webtoon: string) {
  return useQuery({
    queryKey: ["chapters", provider, webtoon],
    queryFn: () => fetchChapterList(provider, webtoon),
  });
}