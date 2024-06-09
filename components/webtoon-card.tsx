"use client"

import Image from "next/image"
import Link from "next/link"
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, Fragment } from "react"
import { Loader2, ServerCrash } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Provider } from "@/components/combobox/providers"

interface WebtoonResponse {
  error: boolean
  message: string
  data: WebtoonData
}

interface WebtoonData {
  prevPage: number
  nextPage: number
  series: Webtoon[]
}

export interface Webtoon {
  provider: string
  slug: string
  title: string
  sourceURL: string
  coverURL: string
  synopsis: string
  genres: string[]
}

export async function getWebtoons(provider: string, page: number, size: number): Promise<WebtoonData> {
  const response = await fetch(`https://manga-scraper.hostinger.fourleaves.studio/api/v1/series/${provider}?page=${page}&size=${size}`)

  const result: WebtoonResponse = await response.json()

  if (result.error) {
    throw new Error(result.message)
  }

  return result.data as WebtoonData
}

export function WebtoonCard({
  selectedProvider,
}: {
  selectedProvider: Provider | null
}) {
  const { ref, inView } = useInView()

  const {
    status,
    data: webtoons,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["webtoons", selectedProvider?.slug],
    queryFn: ({ pageParam = 1 }) => getWebtoons(selectedProvider!.slug, pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])

  if (!selectedProvider) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Please select a provider from the dropdown above.
        </p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading webtoons...
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

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {webtoons?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.series.map((webtoon) => (
              <Card key={webtoon.slug}>
                <Link href={`/webtoons/${selectedProvider.slug}/${webtoon.slug}`} passHref>
                  <CardContent className="p-6">
                    <Image
                      src={webtoon.coverURL}
                      alt={webtoon.title}
                      width={300}
                      height={400}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-y-2">
                    <CardTitle>{webtoon.title}</CardTitle>
                    <CardDescription>
                      {webtoon.genres && webtoon.genres.join(", ")}
                    </CardDescription>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref}>
        {isFetching && (
          <div className="flex-1 flex flex-col justify-center items-center">
            <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Loading webtoons...
            </p>
          </div>
        )}
      </div>
    </>
  )
}
