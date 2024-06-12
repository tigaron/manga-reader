"use client";

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
      <PaginationContent>
        {!!chapterNav.prevSlug && (
          <PaginationItem>
            <PaginationPrevious
              href={`/webtoons/${provider}/${webtoon}/${chapterNav.prevSlug}`}
            />
          </PaginationItem>
        )}
        {!!chapterNav.nextSlug && (
          <PaginationItem>
            <PaginationNext
              href={`/webtoons/${provider}/${webtoon}/${chapterNav.nextSlug}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
