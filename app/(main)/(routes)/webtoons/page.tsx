"use client"

import { Provider, ProvidersComboBoxResponsive } from "@/components/combobox/providers";
import { WebtoonCard } from "@/components/webtoon-card";
import { useState } from "react";

const initProvider: Provider = {
  name: "Asura Scans",
  slug: "asura",
}

export default function Webtoons() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(initProvider)

  return (
    <div className="max-w-screen-xl flex-col gap-2 p-8 mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Webtoons List
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of webtoons you can read.
        </p>
        <ProvidersComboBoxResponsive selectedProvider={selectedProvider} setSelectedProvider={setSelectedProvider} />
        <WebtoonCard selectedProvider={selectedProvider} />
      </div>
    </div>
  )
}