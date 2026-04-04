"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchErrors, deleteError } from "@/lib/api";
import type { ErrorRecord } from "@watchdog/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  ScrollArea,
} from "@watchdog/ui";
import { Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { timeAgo, formatDate, truncate } from "@/lib/utils";

export default function ErrorsPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<ErrorRecord | null>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["errors"],
    queryFn: () => fetchErrors(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteError,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["errors"] });
      setSelected(null);
    },
  });

  const errors = data?.errors ?? [];
  const total = data?.total ?? 0;

  // Group by message for occurrences count
  const occurrences = errors.reduce<Record<string, number>>((acc, e) => {
    acc[e.message] = (acc[e.message] ?? 0) + 1;
    return acc;
  }, {});

  // Deduplicate for display — show unique messages + last seen
  const seen = new Set<string>();
  const deduped: Array<ErrorRecord & { occurrences: number }> = [];
  for (const error of errors) {
    if (!seen.has(error.message)) {
      seen.add(error.message);
      deduped.push({ ...error, occurrences: occurrences[error.message] ?? 1 });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Errors</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total} total events · {deduped.length} unique issues
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Issues</CardTitle>
          <CardDescription>
            Click any row to view the full error details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
              Loading errors...
            </div>
          ) : deduped.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-5xl">✅</span>
              <p className="font-medium">No errors captured</p>
              <p className="text-sm text-muted-foreground">
                Your application is error-free, or the SDK isn&apos;t set up yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Error Message</TableHead>
                  <TableHead className="w-28">Type</TableHead>
                  <TableHead className="w-28 text-right">Occurrences</TableHead>
                  <TableHead className="w-36 text-right">Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deduped.map((error) => (
                  <TableRow
                    key={error.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(error)}
                  >
                    <TableCell className="font-medium">
                      <span className="line-clamp-1">
                        {truncate(error.message, 80)}
                      </span>
                      {error.url && (
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          {truncate(error.url, 60)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          error.type === "unhandledrejection"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {error.type === "unhandledrejection" ? "Promise" : "Error"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {error.occurrences}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {timeAgo(error.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Error Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold pr-8">
              Error Details
            </DialogTitle>
            <DialogDescription>
              ID #{selected?.id} · Captured {selected ? formatDate(selected.created_at) : ""}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              {/* Meta row */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    selected.type === "unhandledrejection"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {selected.type}
                </Badge>
                <Badge variant="outline">Project: {selected.project_id}</Badge>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Message
                </p>
                <p className="text-sm font-medium bg-muted rounded-md p-3">
                  {selected.message}
                </p>
              </div>

              {/* URL */}
              {selected.url && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    URL
                  </p>
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 hover:underline text-blue-400"
                  >
                    {selected.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {/* User Agent */}
              {selected.user_agent && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    User Agent
                  </p>
                  <p className="text-xs text-muted-foreground bg-muted rounded-md p-3 font-mono break-all">
                    {selected.user_agent}
                  </p>
                </div>
              )}

              {/* Stack Trace */}
              {selected.stack && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Stack Trace
                  </p>
                  <ScrollArea className="h-52 rounded-md border bg-muted">
                    <pre className="p-3 text-xs font-mono whitespace-pre-wrap break-all text-muted-foreground">
                      {selected.stack}
                    </pre>
                  </ScrollArea>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() => deleteMutation.mutate(selected.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deleteMutation.isPending ? "Deleting…" : "Delete Error"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
