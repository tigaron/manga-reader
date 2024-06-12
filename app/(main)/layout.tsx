import { NavBar } from "@/components/navigation/navigation-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <NavBar />
      <main className="flex-1 border-b">{children}</main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex h-16 items-center justify-center gap-4">
          <span className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Four Leaves Studio © 2024
          </span>
        </div>
      </footer>
    </div>
  );
}
