import { useQuery } from "@tanstack/react-query";

import { env } from "@/env.mjs";

import { BreadcrumbPage } from "@/components/breadcrumb";

export interface Breadcrumb {
  provider: string;
  series?: string;
  chapter?: string;
}

interface BreadcrumbResponse {
  error: boolean;
  message: string;
  data: Breadcrumb;
}

export async function fetchWebtoonsBC(provider: string, webtoon: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/series/${provider}/${webtoon}/_bc`,
  );
  const result: BreadcrumbResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as Breadcrumb;
}

export async function fetchChapterBC(
  provider: string,
  webtoon: string,
  chapter: string,
) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chapters/${provider}/${webtoon}/${chapter}/_bc`,
  );
  const result: BreadcrumbResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as Breadcrumb;
}

export function useBreadcrumbWebtoons(provider: string, webtoon: string) {
  return useQuery({
    queryKey: ["webtoon-bc", provider, webtoon],
    queryFn: () => fetchWebtoonsBC(provider, webtoon),
  });
}

export function getBreadcrumbWebtoons(data: Breadcrumb) {
  const { provider, series: webtoon } = data;

  const breadcrumbItems: BreadcrumbPage[] = [
    {
      title: "Webtoons",
      href: "/webtoons",
    },
    {
      title: provider,
      href: `/webtoons/${provider}`,
    },
  ];

  const breadcrumbCurrent: BreadcrumbPage = {
    title: webtoon!,
    href: `/webtoons/${provider}/${webtoon}`,
  };

  return { breadcrumbItems, breadcrumbCurrent };
}

export function useBreadcrumbChapters(
  provider: string,
  webtoon: string,
  chapter: string,
) {
  return useQuery({
    queryKey: ["chapter-bc", provider, webtoon, chapter],
    queryFn: () => fetchChapterBC(provider, webtoon, chapter),
  });
}

export function getBreadcrumbChapters(data: Breadcrumb) {
  const { provider, series: webtoon, chapter } = data;

  const breadcrumbItems: BreadcrumbPage[] = [
    {
      title: "Webtoons",
      href: "/webtoons",
    },
    {
      title: provider,
      href: `/webtoons/${provider}`,
    },
    {
      title: webtoon!,
      href: `/webtoons/${provider}/${webtoon}`,
    },
  ];

  const breadcrumbCurrent: BreadcrumbPage = {
    title: chapter!,
    href: `/webtoons/${provider}/${webtoon}/${chapter}`,
  };

  return { breadcrumbItems, breadcrumbCurrent };
}
