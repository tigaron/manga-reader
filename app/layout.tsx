import "./globals.css";

import QueryProviders from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

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
      <ClerkProvider
        appearance={{
          baseTheme: [dark],
        }}
      >
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
      </ClerkProvider>
    </html>
  );
}
