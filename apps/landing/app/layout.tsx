import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Watchdog — Know when your React app breaks.",
  description:
    "Capture runtime JavaScript errors in your React applications. Lightweight, self-hosted, and open source.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
