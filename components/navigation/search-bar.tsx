"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import useDebounce from "@/hooks/use-debounce";
import { useSearchResult } from "@/hooks/use-search-result";
import { cn } from "@/lib/utils";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedSearchTerm = useDebounce(query, 500);
  const { data } = useSearchResult(debouncedSearchTerm);

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    setQuery("");
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => document.removeEventListener("keydown", keydownHandler);
  }, []);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <button
        className="relative inline-flex h-8 w-full items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-input bg-background px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search webtoons...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={handleClose}>
        <CommandInput
          placeholder="Search all providers and webtoons..."
          onValueChange={setQuery}
        />
        <CommandList className="space-y-2">
          {!data && <CommandEmpty>No results found</CommandEmpty>}
          {data &&
            data.map((result, index) => {
              if (!result.title) return null;
              return (
                <Link
                  key={result.slug}
                  href={`/webtoons/${result.provider}/${result.slug}`}
                  passHref
                  onClick={() => handleClose(false)}
                >
                  <div
                    className={cn(
                      "m-2",
                      index !== 0 && "border-t border-neutral-500 py-1",
                    )}
                  >
                    <p className="text-md font-medium text-neutral-200">
                      {result.title}
                    </p>
                    <p
                      className="mt-1 line-clamp-3 text-sm text-neutral-500"
                      dangerouslySetInnerHTML={{ __html: result.synopsis }}
                    />
                  </div>
                </Link>
              );
            })}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
