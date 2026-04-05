import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "React Watchdog — Documentation",
  description: "Official documentation for React Watchdog error monitoring SDK",
};

const navItems = [
  { href: "/docs", label: "Getting Started" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/configuration", label: "SDK Configuration" },
  { href: "/docs/self-hosting", label: "Self Hosting" },
  { href: "/docs/api-reference", label: "API Reference" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#09090b] text-zinc-300">
        {/* Top nav */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white">
              <span>🐕</span>
              <span>React Watchdog</span>
              <span className="text-xs text-zinc-500 font-normal">docs</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <Link href="https://watchdog-landing-hazel.vercel.app/" className="hover:text-white transition-colors">Landing</Link>
              <Link href="https://watchdog-dashboard.vercel.app/" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl flex">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 px-4 border-r border-white/5">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-3 mb-3">
              Documentation
            </p>
            <nav className="space-y-1">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 px-8 py-10">
            <article className="prose prose-sm prose-invert max-w-3xl">
              {children}
            </article>
          </main>
        </div>
      </body>
    </html>
  );
}
