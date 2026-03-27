import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "React Watchdog — Dashboard",
  description: "Monitor runtime errors in your React applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top Navbar */}
              <header className="flex h-14 items-center justify-between border-b px-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐕</span>
                  <span className="font-semibold tracking-tight">React Watchdog</span>
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    v0.1.0
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="http://localhost:3002"
                    target="_blank"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs ↗
                  </a>
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Landing ↗
                  </a>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
