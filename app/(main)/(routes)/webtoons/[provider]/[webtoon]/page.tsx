"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2, ServerCrash } from "lucide-react"

interface WebtoonProps {
  params: {
    provider: string
    webtoon: string
  }
}

interface ListChapterResponse {
  error: boolean
  message: string
  data: ListChapter[]
}

interface ListChapter {
  provider: string
  series: string
  slug: string
  shortTitle: string
  number: number
}

export async function fetchChapterList(provider: string, webtoon: string) {
  const response = await fetch(`https://manga-scraper.hostinger.fourleaves.studio/api/v1/chapters/${provider}/${webtoon}/_list`)

  const result: ListChapterResponse = await response.json()

  if (result.error) {
    throw new Error(result.message)
  }

  return result.data as ListChapter[]
}

export default function Webtoon({ params }: WebtoonProps) {
  const { provider, webtoon } = params

  const { status, data: listChapter, error } = useQuery({
    queryKey: ["chapters", provider, webtoon],
    queryFn: () => fetchChapterList(provider, webtoon),
  })

  if (status === 'pending') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading chapters...
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

  if (!listChapter) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          No chapters found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl flex-col gap-2 p-8 mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {provider}: {webtoon}
        </h2>
        <p className="text-muted-foreground">
          Here's a list of chapters you can read.
        </p>
      </div>
      <div>
        <ul>
          {
            listChapter.map((chapter) => (
              <li key={chapter.slug}>
                <a href={`/webtoons/${chapter.provider}/${chapter.series}/${chapter.slug}`}>
                {chapter.shortTitle}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}