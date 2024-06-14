"use client";

import { StatusError, StatusInfo, StatusPending } from "@/components/status-ui";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Provider } from "@/hooks/use-webtoon-providers";
import { useWebtoons } from "@/hooks/use-webtoons";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function WebtoonCard({
  selectedProvider,
}: {
  selectedProvider: Provider | null;
}) {
  const { ref, inView } = useInView();
  const {
    status,
    data: webtoons,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useWebtoons(selectedProvider?.slug ?? "", !!selectedProvider);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (!selectedProvider)
    return <StatusInfo message="Select a provider to view webtoons." />;
  if (status === "pending")
    return <StatusPending message="Loading webtoons..." />;
  if (error instanceof Error) return <StatusError message={error.message} />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {webtoons?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.series.map((webtoon) => (
            <Card key={webtoon.slug}>
              <Link
                href={`/webtoons/${selectedProvider.slug}/${webtoon.slug}`}
                passHref
              >
                <CardContent className="relative h-96 w-auto">
                  <Image
                    src={webtoon.coverURL}
                    alt={webtoon.title}
                    layout="fill"
                    objectFit="cover"
                    className="p-6"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-y-2 text-center">
                  <CardTitle className="w-full">{webtoon.title}</CardTitle>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </Fragment>
      ))}
      <div ref={ref}>
        {isFetching && <StatusPending message="Loading more webtoons..." />}
      </div>
    </div>
  );
}
