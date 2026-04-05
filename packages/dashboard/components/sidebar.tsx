"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bug, Settings, BarChart3 } from "lucide-react";
import { cn } from "@watchdog/ui";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/errors", label: "Errors", icon: Bug },
  { href: "/analytics", label: "Analytics", icon: BarChart3, disabled: true },
  { href: "/settings", label: "Settings", icon: Settings, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-card flex flex-col">
      <nav className="flex-1 py-4 space-y-1 px-3">
        <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon, disabled }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={disabled ? "#" : href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                disabled && "pointer-events-none opacity-40"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {disabled && (
                <span className="ml-auto text-xs rounded-sm bg-muted px-1.5 py-0.5">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Monitoring{" "}
          <span className="font-medium text-foreground">demo-project</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate" title={process.env.NEXT_PUBLIC_API_URL || "https://watchdog-api-pvq7.onrender.com"}>
          API: {process.env.NEXT_PUBLIC_API_URL?.replace(/^https?:\/\//, "") || "watchdog-api-pvq7.onrender.com"}
        </p>
      </div>
    </aside>
  );
}
