"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';

interface SearchResponse {
  error: boolean;
  message: string;
  data: SearchResponseData[];
}

interface SearchResponseData {
  provider: string;
  slug: string;
  title: string;
  synopsis: string;
  genres: string[];
}

async function search(query: string): Promise<SearchResponseData[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`https://manga-scraper.hostinger.fourleaves.studio/api/v1/search?q=${encodedQuery}`);
  const result: SearchResponse = await response.json();
  if (result.error) throw new Error(result.message)
  return result.data as SearchResponseData[];
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponseData[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (q: string) => {
    try {
      const data = await search(q);
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
    setIsOpen(open);
  }

  const onEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (timerRef.current) clearTimeout(timerRef.current);
    await handleSearch(query);
  }

  useEffect(() => {
    if (query === '') {
      setResults([]);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      await handleSearch(query);
    }, 500);
  }, [query]);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(open => !open);
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <button
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="hidden lg:inline-flex">
          Search webtoons...
        </span>
        <span className="inline-flex lg:hidden">
          Search...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={handleClose}>
        <CommandInput placeholder="Search all providers and webtoons..." onValueChange={setQuery} onKeyDown={onEnter} />
        <CommandList>
          {results.length === 0 ? (
            <CommandEmpty>No results found</CommandEmpty>
          ) : (
            results.map((result) => (
              <CommandEmpty key={result.slug} className='items-start mb-2'>
                <Link href={`/webtoons/${result.provider}/${result.slug}`} passHref>
                  <div className="m-4 flex-auto">
                    <p className="text-md font-medium text-neutral-200 truncate">
                      {result.title}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1" dangerouslySetInnerHTML={{ __html: result.synopsis }} />
                    {/* <span className="mr-2">
                        Ongoing
                      </span>

                      <span className="mr-2">
                         5 months ago
                      </span>

                      <span className="mr-2">
                         75 Chapters
                      </span> */}
                  </div>
                </Link>
              </CommandEmpty>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </div>
  )
}
