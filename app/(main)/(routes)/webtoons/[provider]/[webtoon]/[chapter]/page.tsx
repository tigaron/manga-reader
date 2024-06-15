"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { useBreadcrumbChapters } from "@/hooks/use-breadcrumb";
import { useChapter } from "@/hooks/use-chapter";

import { BreadcrumbComponent } from "@/components/breadcrumb";
import { StatusInfo, StatusPending } from "@/components/status-ui";

import ChapterImage from "./_components/chapter-image";
import { ChapterPagination } from "./_components/chapter-pagination";

interface ChapterProps {
  params: {
    provider: string;
    webtoon: string;
    chapter: string;
  };
}

export default function Chapter({ params }: ChapterProps) {
  const { provider, webtoon, chapter } = params;

  const { isLoading: bcIsLoading, data: bcData } = useBreadcrumbChapters(
    provider,
    webtoon,
    chapter,
  );

  const {
    status,
    data: chapterData,
    error,
  } = useChapter(provider, webtoon, chapter);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (status === "pending")
    return <StatusPending message="Loading chapter..." />;
  if (!chapterData) return <StatusInfo message="Chapter not found" />;

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-4 px-2 text-center md:px-4 lg:px-0">
      <h1 className="text-2xl font-bold tracking-tight">
        {chapterData.fullTitle}
      </h1>
      <BreadcrumbComponent
        type="chapter"
        isLoading={bcIsLoading}
        data={bcData}
      />
      <ChapterPagination
        provider={provider}
        webtoon={webtoon}
        chapterNav={chapterData.chapterNav}
      />
      <div className="flex w-full flex-col items-center justify-center">
        {chapterData.contentURLs.map((contentURL, index) => (
          <ChapterImage
            key={index}
            contentURL={contentURL}
            fullTitle={chapterData.slug + "-image-" + index}
          />
        ))}
      </div>
      <ChapterPagination
        provider={provider}
        webtoon={webtoon}
        chapterNav={chapterData.chapterNav}
      />
    </div>
  );
}
