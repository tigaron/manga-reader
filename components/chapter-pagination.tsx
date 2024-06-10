import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  hasPrev: boolean
  prevURL?: string
  hasNext: boolean
  nextURL?: string
}

export function ChapterPagination(
  {
    hasPrev,
    prevURL,
    hasNext,
    nextURL,
  }: PaginationProps
) {
  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious href={prevURL} />
          </PaginationItem>
        )}
        {hasNext && (
          <PaginationItem>
            <PaginationNext href={nextURL} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
