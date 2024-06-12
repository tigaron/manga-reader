import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProviders from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTopButton } from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "Manga Reader",
  description: "Read manga online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="ms-theme"
          >
            {children}
          </ThemeProvider>
        </QueryProviders>
        <Toaster />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
