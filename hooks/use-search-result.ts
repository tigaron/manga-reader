import { useQuery } from "@tanstack/react-query";

import { env } from "@/env.mjs";

interface SearchResponse {
  error: boolean;
  message: string;
  data: SearchData[];
}

export interface SearchData {
  provider: string;
  slug: string;
  title: string;
  synopsis: string;
  genres: string[];
}

export async function fetchSearchResult(query: string): Promise<SearchData[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search?q=${encodedQuery}`,
  );
  const result: SearchResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as SearchData[];
}

export function useSearchResult(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => {
      if (query) {
        return fetchSearchResult(query);
      }
      return [];
    },
    enabled: query.length > 0,
  });
}
