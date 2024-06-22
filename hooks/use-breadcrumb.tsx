import { useQuery } from "@tanstack/react-query";

import { env } from "@/env.mjs";

import { BreadcrumbPage } from "@/components/breadcrumb";

export interface Breadcrumb {
  slug: string;
  title: string;
}

export interface BreadcrumbsData {
  provider: Breadcrumb;
  series?: Breadcrumb;
  chapter?: Breadcrumb;
}

interface BreadcrumbResponse {
  error: boolean;
  message: string;
  data: BreadcrumbsData;
}

export async function fetchWebtoonsBC(provider: string, webtoon: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/series/${provider}/${webtoon}/_bc`,
  );
  const result: BreadcrumbResponse = await response.json();
  if (result.error) throw new Error(result.message);
  return result.data as BreadcrumbsData;
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
  return result.data as BreadcrumbsData;
}

export function useBreadcrumbWebtoons(provider: string, webtoon: string) {
  return useQuery({
    queryKey: ["webtoon-bc", provider, webtoon],
    queryFn: () => fetchWebtoonsBC(provider, webtoon),
  });
}

export function getBreadcrumbWebtoons(data: BreadcrumbsData) {
  const { provider, series: webtoon } = data;

  const breadcrumbItems: BreadcrumbPage[] = [
    {
      title: "Webtoons",
      href: "/webtoons",
    },
    {
      title: provider.title,
      href: `/webtoons/${provider.slug}`,
    },
  ];

  const breadcrumbCurrent: BreadcrumbPage = {
    title: webtoon?.title!,
    href: `/webtoons/${provider.slug}/${webtoon?.slug}`,
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

export function getBreadcrumbChapters(data: BreadcrumbsData) {
  const { provider, series: webtoon, chapter } = data;

  const breadcrumbItems: BreadcrumbPage[] = [
    {
      title: "Webtoons",
      href: "/webtoons",
    },
    {
      title: provider.title,
      href: `/webtoons/${provider.slug}`,
    },
    {
      title: webtoon?.title!,
      href: `/webtoons/${provider.slug}/${webtoon?.slug}`,
    },
  ];

  const breadcrumbCurrent: BreadcrumbPage = {
    title: chapter?.title!,
    href: `/webtoons/${provider.slug}/${webtoon?.slug}/${chapter?.slug}`,
  };

  return { breadcrumbItems, breadcrumbCurrent };
}
