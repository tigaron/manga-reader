"use client"

import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useState, useEffect } from 'react';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search all providers and webtoons..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </div>
  )
}