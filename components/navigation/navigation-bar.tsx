"use client";

import { NavMenu } from "@/components/navigation/navigation-menu";
import { SearchBar } from "@/components/navigation/search-bar";
import { SiteIcon } from "@/components/navigation/site-icon";
import { MobileToggle } from "@/components/navigation/mobile-toggle";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <SiteIcon />
          <NavMenu />
        </div>
        <MobileToggle />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
