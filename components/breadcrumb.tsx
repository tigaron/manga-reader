"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface BreadcrumbProps {
  items: BreadcrumbPage[];
  currentItem: BreadcrumbPage;
}

export interface BreadcrumbPage {
  title: string;
  href: string;
}

export function BreadcrumbComponent({ items, currentItem }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="flex flex-col space-y-1 px-2 text-sm"
            >
              {items.map((item, index) => (
                <BreadcrumbItem
                  key={index}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BreadcrumbLink>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentItem.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
