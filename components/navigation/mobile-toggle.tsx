"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Webtoons",
    href: "/webtoons",
  },
  {
    title: "Bookmark",
    href: "/bookmark",
  },
];

export function MobileToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col justify-start gap-2 p-6"
      >
        <Link href="/" passHref>
          <span className="font-bold">Manga Reader</span>
        </Link>
        {components.map((component) => (
          <Link key={component.title} href={component.href} passHref>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {component.title}
            </span>
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
