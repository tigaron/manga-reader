"use client";

import {
  BreadcrumbsData as BCType,
  getBreadcrumbChapters,
  getBreadcrumbWebtoons,
} from "@/hooks/use-breadcrumb";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface BreadcrumbProps {
  type: "webtoon" | "chapter";
  isLoading: boolean;
  data: BCType | undefined;
}

export interface BreadcrumbPage {
  title: string;
  href: string;
}

const getBreadcrumb = {
  webtoon: getBreadcrumbWebtoons,
  chapter: getBreadcrumbChapters,
};

export function BreadcrumbComponent({
  type,
  isLoading,
  data,
}: BreadcrumbProps) {
  if (isLoading) return <Skeleton className="h-4 w-1/2" />;

  if (!data) return null;

  const { breadcrumbItems, breadcrumbCurrent } = getBreadcrumb[type](data);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
              {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem
                  key={index}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbCurrent.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
