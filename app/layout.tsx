import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";

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
      <body className="min-h-screen bg-background font-sans antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="ms-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
