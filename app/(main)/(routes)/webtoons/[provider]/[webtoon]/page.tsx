"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useBreadcrumbWebtoons } from "@/hooks/use-breadcrumb";
import { useChapterList } from "@/hooks/use-chapter-list";

import { BreadcrumbComponent } from "@/components/breadcrumb";
import { StatusInfo, StatusPending } from "@/components/status-ui";

import { ChapterTable } from "./_components/chapter-table";

interface WebtoonProps {
  params: {
    provider: string;
    webtoon: string;
  };
}

export default function Webtoon({ params }: WebtoonProps) {
  const { provider, webtoon } = params;

  const { isLoading: bcIsLoading, data: bcData } = useBreadcrumbWebtoons(
    provider,
    webtoon,
  );

  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const {
    status,
    data: listChapter,
    error,
  } = useChapterList(provider, webtoon, token);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken || "");
    };

    fetchToken();
  }, [getToken]);

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
          type="webtoon"
          isLoading={bcIsLoading}
          data={bcData}
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
