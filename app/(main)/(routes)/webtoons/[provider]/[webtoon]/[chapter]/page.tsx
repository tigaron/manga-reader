"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { fetchChapter } from "@/lib/requests/fetch-chapter";

import { StatusInfo, StatusPending } from "@/components/status-ui";

import { ChapterPagination } from "./_components/chapter-pagination";
import ChapterImage from "./_components/chapter-image";

interface ChapterProps {
  params: {
    provider: string;
    webtoon: string;
    chapter: string;
  };
}

export default function Chapter({ params }: ChapterProps) {
  const { provider, webtoon, chapter } = params;

  const {
    status,
    data: chapterData,
    error,
  } = useQuery({
    queryKey: ["chapter", provider, webtoon, chapter],
    queryFn: () => fetchChapter(provider, webtoon, chapter),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (status === "pending")
    return <StatusPending message="Loading chapter..." />;
  if (!chapterData) return <StatusInfo message="Chapter not found" />;

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-bold tracking-tight">
        {chapterData.fullTitle}
      </h1>
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
            fullTitle={chapterData.fullTitle}
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
