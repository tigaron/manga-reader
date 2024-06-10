"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useState } from "react"

import { Webtoon } from "@/components/webtoon-card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ListChapterResponse {
  error: boolean
  message: string
  data: ListChapterData
}

interface ListChapterData {
  series: Webtoon
  chapters: ListChapter[]
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
  if (result.error) throw new Error(result.message)
  return result.data as ListChapterData
}

const columns: ColumnDef<ListChapter>[] = [
  {
    accessorKey: "shortTitle",
    cell: ({ row }) => {
      return (
        <Link href={`/webtoons/${row.getValue("provider")}/${row.getValue("series")}/${row.getValue("slug")}`} passHref>
          {row.getValue("shortTitle")}
        </Link>
      )
    },
  },
  {
    accessorKey: "provider",
  },
  {
    accessorKey: "series",
  },
  {
    accessorKey: "slug",
  },
  {
    accessorKey: "number",
  },
]

export function ChapterTable({
  chapters,
}: {
  chapters: ListChapter[]
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: chapters,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search chapter..."
          value={(table.getColumn("shortTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("shortTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().filter((cell) => cell.id.includes("shortTitle")).map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
