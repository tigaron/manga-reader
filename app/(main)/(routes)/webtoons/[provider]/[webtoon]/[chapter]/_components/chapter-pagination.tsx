"use client";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  provider: string;
  webtoon: string;
  chapterNav: {
    prevSlug: string | null;
    nextSlug: string | null;
  };
}

export function ChapterPagination({
  provider,
  webtoon,
  chapterNav,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between px-0 sm:px-20 md:px-40 lg:px-60 xl:px-80">
        {!!chapterNav.prevSlug && (
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-28",
              )}
              href={`/webtoons/${provider}/${webtoon}/${chapterNav.prevSlug}`}
            />
          </PaginationItem>
        )}
        {!!chapterNav.nextSlug && (
          <PaginationItem>
            <PaginationNext
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-28",
              )}
              href={`/webtoons/${provider}/${webtoon}/${chapterNav.nextSlug}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
