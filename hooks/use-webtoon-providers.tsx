import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

interface ProviderResponse {
  error: boolean;
  message: string;
  data: Provider[];
}

export interface Provider {
  name: string;
  slug: string;
}

export async function fetchWebtoonProviders() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`,
  );
  const result: ProviderResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as Provider[];
}

export function useWebtoonProviders() {
  return useQuery({
    queryKey: ["providers"],
    queryFn: fetchWebtoonProviders,
  });
}
