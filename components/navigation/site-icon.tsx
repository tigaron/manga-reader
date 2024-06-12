"use client";

import Link from "next/link";

export function SiteIcon() {
  return (
    <Link href="/" passHref className="mr-6 flex items-center space-x-2">
      <span className="hidden font-bold sm:inline-block">Manga Reader</span>
    </Link>
  );
}
