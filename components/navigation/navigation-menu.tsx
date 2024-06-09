"use client"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const components: { title: string; href: string; }[] = [
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
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {components.map((component) => (
          <NavigationMenuItem key={component.title}>
            <Link
              href={component.href}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent focus:bg-transparent",
              )}>
                {component.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
