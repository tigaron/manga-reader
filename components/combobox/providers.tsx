"use client"

import { useQuery } from "@tanstack/react-query"
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

export interface ProviderResponse {
  error: boolean
  message: string
  data: Provider[]
}

export interface Provider {
  name: string
  slug: string
}

export async function fetchProviders() {
  const response = await fetch("https://manga-scraper.hostinger.fourleaves.studio/api/v1/providers")

  const result: ProviderResponse = await response.json()

  if (result.error) {
    throw new Error(result.message)
  }

  return result.data as Provider[]
}

export function ProvidersComboBoxResponsive({
  selectedProvider,
  setSelectedProvider,
}: {
  selectedProvider: Provider | null
  setSelectedProvider: (Provider: Provider | null) => void
}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const { status, data: providers, error } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
  })

  if (isDesktop) {
    return (
      <>
        {
          status === "pending" ? (
            <p>Loading...</p>
          ) : error instanceof Error ? (
            <p>Error: {error.message}</p>
          ) : !providers ? (
            <p>No providers found.</p>
          ) : (
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
      </>
    )
  }

  return (
    <>
      {
        status === "pending" ? (
          <p>Loading...</p>
        ) : error instanceof Error ? (
          <p>Error: {error.message}</p>
        ) : !providers ? (
          <p>No data found.</p>
        ) : (
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
    </>
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
