"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Provider, useWebtoonProviders } from "@/hooks/use-webtoon-providers";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ProvidersComboBoxResponsive({
  selectedProvider,
  setSelectedProvider,
}: {
  selectedProvider: Provider | null;
  setSelectedProvider: (Provider: Provider | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: providers, error } = useWebtoonProviders();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] justify-between"
            role="combobox"
            aria-expanded={open}
          >
            {selectedProvider ? `${selectedProvider.name}` : `Select Provider`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ProviderList
            setOpen={setOpen}
            setSelectedProvider={setSelectedProvider}
            selectedProvider={selectedProvider}
            providers={providers}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] justify-between"
          role="combobox"
          aria-expanded={open}
        >
          {selectedProvider ? `${selectedProvider.name}` : `Select Provider`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ProviderList
            setOpen={setOpen}
            setSelectedProvider={setSelectedProvider}
            selectedProvider={selectedProvider}
            providers={providers}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProviderList({
  setOpen,
  setSelectedProvider,
  selectedProvider,
  providers,
}: {
  setOpen: (open: boolean) => void;
  setSelectedProvider: (Provider: Provider | null) => void;
  selectedProvider: Provider | null;
  providers: Provider[] | undefined;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter provider..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {providers &&
            providers.map((provider) => (
              <CommandItem
                key={provider.slug}
                value={provider.slug}
                onSelect={(value) => {
                  setSelectedProvider(
                    providers.find((provider) => provider.slug === value) ??
                      null,
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedProvider && selectedProvider.slug === provider.slug
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {provider.name}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
