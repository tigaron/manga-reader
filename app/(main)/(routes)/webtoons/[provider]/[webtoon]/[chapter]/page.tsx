"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import { StatusError, StatusInfo, StatusPending } from "@/components/status-ui"
import { ChapterPagination } from "@/components/chapter-pagination"

interface ChapterProps {
  params: {
    provider: string
    webtoon: string
    chapter: string
  }
}

interface ChapterResponse {
  error: boolean
  message: string
  data: Chapter
}

interface Chapter {
  provider: string
  series: string
  slug: string
  fullTitle: string
  shortTitle: string
  number: number
  sourceURL: string
  chapterNav: {
    nextSlug: string
    nextURL: string
    prevSlug: string
    prevURL: string
  }
  contentURLs: string[]
}

async function fetchChapter(provider: string, webtoon: string, chapter: string) {
  const response = await fetch(`https://manga-scraper.hostinger.fourleaves.studio/api/v1/chapters/${provider}/${webtoon}/${chapter}`)
  const result: ChapterResponse = await response.json()
  if (result.error) throw new Error(result.message)
  return result.data as Chapter
}

export default function Chapter({ params }: ChapterProps) {
  const { provider, webtoon, chapter } = params

  const { status, data: chapterData, error } = useQuery({
    queryKey: ["chapter", provider, webtoon, chapter],
    queryFn: () => fetchChapter(provider, webtoon, chapter),
  })

  if (status === 'pending') return <StatusPending message="Loading chapter..." />
  if (error instanceof Error) return <StatusError message={error.message} />
  if (!chapterData) return <StatusInfo message="No chapter found." />

  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">{chapterData.fullTitle}</h1>
      <ChapterPagination hasPrev={!!chapterData.chapterNav.prevSlug} prevURL={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.prevSlug}`} hasNext={!!chapterData.chapterNav.nextSlug} nextURL={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.nextSlug}`} />
      <div className="flex flex-col">
        {chapterData.contentURLs.map((contentURL, index) => (
          <Image key={index} src={contentURL} alt={chapterData.fullTitle} width={800} height={1200} />
        ))}
      </div>
      <ChapterPagination hasPrev={!!chapterData.chapterNav.prevSlug} prevURL={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.prevSlug}`} hasNext={!!chapterData.chapterNav.nextSlug} nextURL={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.nextSlug}`} />
    </div>
  )
}