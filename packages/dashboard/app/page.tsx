"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchErrors } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from "@watchdog/ui";
import { AlertTriangle, Activity, Clock, TrendingUp } from "lucide-react";

export default function OverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["errors"],
    queryFn: () => fetchErrors(),
  });

  const errors = data?.errors ?? [];
  const totalErrors = data?.total ?? 0;

  // Group errors by message to find unique issues
  const grouped = errors.reduce<Record<string, number>>((acc, e) => {
    acc[e.message] = (acc[e.message] ?? 0) + 1;
    return acc;
  }, {});
  const uniqueIssues = Object.keys(grouped).length;

  // Errors in last 24h
  const last24h = errors.filter((e) => {
    return Date.now() - new Date(e.created_at).getTime() < 24 * 60 * 60 * 1000;
  }).length;

  const last1h = errors.filter((e) => {
    return Date.now() - new Date(e.created_at).getTime() < 60 * 60 * 1000;
  }).length;

  const statCards = [
    {
      title: "Total Errors",
      value: isLoading ? "—" : totalErrors.toString(),
      icon: AlertTriangle,
      description: "All time captured errors",
      variant: totalErrors > 0 ? "destructive" : "default",
    },
    {
      title: "Unique Issues",
      value: isLoading ? "—" : uniqueIssues.toString(),
      icon: TrendingUp,
      description: "Distinct error messages",
      variant: "default",
    },
    {
      title: "Last 24 Hours",
      value: isLoading ? "—" : last24h.toString(),
      icon: Clock,
      description: "Errors in past 24 hours",
      variant: last24h > 0 ? "destructive" : "default",
    },
    {
      title: "Last Hour",
      value: isLoading ? "—" : last1h.toString(),
      icon: Activity,
      description: "Errors in past hour",
      variant: last1h > 0 ? "destructive" : "default",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time error monitoring for your React applications
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ title, value, icon: Icon, description, variant }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{value}</span>
                {variant === "destructive" && value !== "0" && (
                  <Badge variant="destructive" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-1">{description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Errors preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Errors</CardTitle>
          <CardDescription>Latest 5 captured error events</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground text-sm">Loading...</div>
          ) : errors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <span className="text-4xl">✅</span>
              <p className="text-muted-foreground text-sm">
                No errors captured yet
              </p>
              <p className="text-xs text-muted-foreground">
                Install the SDK and errors will appear here automatically
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {errors.slice(0, 5).map((error) => (
                <div
                  key={error.id}
                  className="flex items-start gap-3 rounded-md border p-3 text-sm"
                >
                  <Badge variant="destructive" className="text-xs mt-0.5 shrink-0">
                    {error.type}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{error.message}</p>
                    <p className="text-muted-foreground text-xs mt-0.5 truncate">
                      {error.url ?? "Unknown URL"}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(error.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SDK Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Start</CardTitle>
          <CardDescription>
            Add React Watchdog to your app in 2 steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              1. Install the SDK
            </p>
            <code className="block rounded-md bg-muted px-4 py-3 text-sm font-mono">
              npm install @watchdog/sdk
            </code>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              2. Initialize in your app entry point
            </p>
            <pre className="rounded-md bg-muted px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre">
              {`import { initMonitor } from "@watchdog/sdk";\n\ninitMonitor({\n  endpoint: "${(process.env.NEXT_PUBLIC_API_URL || "https://watchdog-api-pvq7.onrender.com").replace(/\/$/, "")}/errors",\n  projectId: "your-project-id",\n});`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
