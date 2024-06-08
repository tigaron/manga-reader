"use client"

import { Provider, ProvidersComboBoxResponsive } from "@/components/combobox/providers";
import { useQuery } from "@tanstack/react-query";



interface ProviderResponse {
  error: boolean
  message: string
  data: Provider[]
}

export async function fetchProviders() {
  const res = await fetch("http://localhost:1323/api/v1/providers")

  if (!res.ok) {
    throw new Error("Network response was not ok")
  }

  const data: ProviderResponse = await res.json()

  if (data.error) {
    throw new Error(data.message)
  }

  return data.data as Provider[]
}

export default function Webtoons() {
  const { status, data, error } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
  })

  return (
    <div className="max-w-screen-xl flex-col gap-2 p-8 mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Webtoons List
        </h2>
        <p className="text-muted-foreground">
          Here's a list of webtoons you can read.
        </p>
      </div>
      <div>
        <div>
          {status === 'pending' ? (
            'Loading...'
          ) : error instanceof Error ? (
            <span>Error: {error.message}</span>
          ) : (
            <>{data && <ProvidersComboBoxResponsive providers={data} />}</>
          )}
        </div>
      </div>
    </div>
  )
}
