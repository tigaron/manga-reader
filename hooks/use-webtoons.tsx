import { useInfiniteQuery } from "@tanstack/react-query";

import { env } from "@/env.mjs";

interface WebtoonResponse {
  error: boolean;
  message: string;
  data: WebtoonData;
}

interface WebtoonData {
  prevPage: number;
  nextPage: number;
  series: Webtoon[];
}

export interface Webtoon {
  provider: string;
  slug: string;
  title: string;
  sourceURL: string;
  coverURL: string;
  synopsis: string;
  genres: string[];
}

export async function fetchWebtoons(
  provider: string,
  page: number,
  size: number,
): Promise<WebtoonData> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/series/${provider}?page=${page}&size=${size}`,
  );
  const result: WebtoonResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as WebtoonData;
}

export function useWebtoons(provider: string, isEnabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["webtoons", provider],
    queryFn: ({ pageParam = 1 }) => fetchWebtoons(provider, pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled: isEnabled,
  });
}
