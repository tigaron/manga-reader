"use client";

import { useState } from "react";

import { Provider } from "@/hooks/use-webtoon-providers";

import { ProvidersComboBoxResponsive } from "./_components/providers-combobox";
import { WebtoonCard } from "./_components/webtoon-card";

export default function Webtoons() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  return (
    <div className="mx-auto max-w-screen-xl flex-col gap-2 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Webtoons List</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of webtoons you can read.
        </p>
        <ProvidersComboBoxResponsive
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />
        <WebtoonCard selectedProvider={selectedProvider} />
      </div>
    </div>
  );
}
