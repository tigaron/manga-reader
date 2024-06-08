"use client"

import { useState } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface Provider {
  name: string
  slug: string
  baseURL: string
}

export function ProvidersComboBoxResponsive({ providers }: { providers: Provider[]}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    providers[0] || null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedProvider ? <>{selectedProvider.name}</> : <>Select Provider</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ProviderList setOpen={setOpen} setSelectedProvider={setSelectedProvider} providers={providers} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedProvider ? <>{selectedProvider.name}</> : <>Select Provider</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ProviderList setOpen={setOpen} setSelectedProvider={setSelectedProvider} providers={providers} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ProviderList({
  setOpen,
  setSelectedProvider,
  providers,
}: {
  setOpen: (open: boolean) => void
  setSelectedProvider: (Provider: Provider | null) => void
  providers: Provider[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter provider..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {providers.map((provider) => (
            <CommandItem
              key={provider.slug}
              value={provider.slug}
              onSelect={(value) => {
                setSelectedProvider(
                  providers.find((provider) => provider.slug === value) || null
                )
                setOpen(false)
              }}
            >
              {provider.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
