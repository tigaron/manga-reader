import { BreadcrumbPage } from "@/components/breadcrumb";

export function useBreadcrumbWebtoons(provider: string, webtoon: string) {
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
    title: webtoon,
    href: `/webtoons/${provider}/${webtoon}`,
  };

  return { breadcrumbItems, breadcrumbCurrent };
}

export function useBreadcrumbChapters(
  provider: string,
  webtoon: string,
  chapter: string,
) {
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
      title: webtoon,
      href: `/webtoons/${provider}/${webtoon}`,
    },
  ];

  const breadcrumbCurrent: BreadcrumbPage = {
    title: chapter,
    href: `/webtoons/${provider}/${webtoon}/${chapter}`,
  };

  return { breadcrumbItems, breadcrumbCurrent };
}
