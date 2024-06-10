"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import { ChapterTable, fetchChapterList } from "@/components/chapter-table"
import { StatusError, StatusInfo, StatusPending } from "@/components/status-ui"

interface WebtoonProps {
  params: {
    provider: string
    webtoon: string
  }
}

export default function Webtoon({ params }: WebtoonProps) {
  const { provider, webtoon } = params

  const { status, data: listChapter, error } = useQuery({
    queryKey: ["chapters", provider, webtoon],
    queryFn: () => fetchChapterList(provider, webtoon),
  })

  if (status === 'pending') return <StatusPending message="Loading chapters..." />
  if (error instanceof Error) return <StatusError message={error.message} />
  if (!listChapter) return <StatusInfo message="No chapters found." />

  return (
    <div className="max-w-screen-xl flex-col gap-2 p-8 mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {listChapter.series.title}
        </h2>
        <Image
          src={listChapter.series.coverURL}
          alt={listChapter.series.title}
          width={300}
          height={400}
          className="rounded-md"
        />
      </div>
      <div>
        <p className="text-lg mt-2">
          {listChapter.series.synopsis}
        </p>
        <p className="text-md text-muted-foreground">
          Genres: {listChapter.series.genres.join(", ")}
        </p>
      </div>
      <ChapterTable chapters={listChapter.chapters} />
    </div>
  )
}