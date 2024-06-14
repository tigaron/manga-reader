"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

import { ChapterTable, fetchChapterList } from "@/components/chapter-table";
import { StatusInfo, StatusPending } from "@/components/status-ui";
import { BreadcrumbComponent, BreadcrumbPage } from "@/components/breadcrumb";

interface WebtoonProps {
  params: {
    provider: string;
    webtoon: string;
  };
}

export default function Webtoon({ params }: WebtoonProps) {
  const { provider, webtoon } = params;

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

  const {
    status,
    data: listChapter,
    error,
  } = useQuery({
    queryKey: ["chapters", provider, webtoon],
    queryFn: () => fetchChapterList(provider, webtoon),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (status === "pending")
    return <StatusPending message="Loading chapters..." />;
  if (!listChapter) return <StatusInfo message="No chapters found." />;

  return (
    <div className="mx-auto max-w-screen-xl flex-col gap-2 p-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {listChapter.series.title}
        </h1>
        <BreadcrumbComponent
          items={breadcrumbItems}
          currentItem={breadcrumbCurrent}
        />
        <Image
          src={listChapter.series.coverURL}
          alt={listChapter.series.title}
          width={300}
          height={400}
          className="rounded-md"
        />
      </div>
      <div>
        <p
          className="mt-2 text-lg"
          dangerouslySetInnerHTML={{ __html: listChapter.series.synopsis }}
        />
        <p className="text-md text-muted-foreground">
          Genres: {listChapter.series.genres.join(", ")}
        </p>
      </div>
      <ChapterTable chapters={listChapter.chapters} />
    </div>
  );
}
