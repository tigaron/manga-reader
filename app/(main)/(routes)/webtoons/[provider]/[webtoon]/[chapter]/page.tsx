"use client"

import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Loader2, ServerCrash } from "lucide-react"
import Image from "next/image"

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

  if (result.error) {
    throw new Error(result.message)
  }

  return result.data as Chapter
}

export default function Chapter({ params }: ChapterProps) {
  const { provider, webtoon, chapter } = params

  const { status, data: chapterData, error } = useQuery({
    queryKey: ["chapter", provider, webtoon, chapter],
    queryFn: () => fetchChapter(provider, webtoon, chapter),
  })

  if (status === 'pending') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading chapter...
        </p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Not found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto">
      <h1>{chapterData.fullTitle}</h1>
      <div className="flex gap-4">
        {chapterData.chapterNav.prevSlug && (
          <Button>
            <a href={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.prevSlug}`}>
              Prev
            </a>
          </Button>
        )}
        {chapterData.chapterNav.nextSlug && (
          <Button>
            <a href={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.nextSlug}`}>
              Next
            </a>
          </Button>
        )}
      </div>
      <div className="flex flex-col">
        {chapterData.contentURLs.map((contentURL, index) => (
          <Image key={index} src={contentURL} alt={chapterData.fullTitle} width={800} height={1200} />
        ))}
      </div>
      <div className="flex gap-4">
        {chapterData.chapterNav.prevSlug && (
          <Button>
            <a href={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.prevSlug}`}>
              Prev
            </a>
          </Button>
        )}
        {chapterData.chapterNav.nextSlug && (
          <Button>
            <a href={`/webtoons/${provider}/${webtoon}/${chapterData.chapterNav.nextSlug}`}>
              Next
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}