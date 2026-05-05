"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal, Download, Mail, Building, Clock,
  DollarSign, Users, X, Search, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAuthToken } from "@/lib/auth-client";
import { toast } from "sonner";

interface Consultation {
  id: string;
  name: string;
  email: string;
  company?: string;
  need: string;
  timeline?: string;
  budget?: string;
  message?: string;
  createdAt: string;
}

interface PaginatedResponse {
  data: Consultation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PER_PAGE = 10;

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [needFilter, setNeedFilter] = useState("all");
  const [uniqueNeeds, setUniqueNeeds] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(value);
      setPage(1); // Reset to first page on search
    }, 400);
  }, []);

  // Fetch unique needs for filter dropdown
  useEffect(() => {
    async function fetchNeeds() {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_URL}/api/consultations/needs`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          setUniqueNeeds(await res.json());
        }
      } catch {}
    }
    fetchNeeds();
  }, []);

  // Fetch consultations with pagination + search + filter
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = getAuthToken();
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PER_PAGE.toString(),
        });
        if (searchQuery) params.set("search", searchQuery);
        if (needFilter !== "all") params.set("need", needFilter);

        const res = await fetch(`${API_URL}/api/consultations?${params}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const result: PaginatedResponse = await res.json();
        setConsultations(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch {
        toast.error("Failed to load consultations.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, searchQuery, needFilter, refreshKey]);

  async function handleDelete(id: string) {
    setIsDeleting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/consultations/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Consultation deleted successfully.");
      setRefreshKey((k) => k + 1);
    } catch {
      toast.error("Failed to delete consultation.");
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  }

  // Export all filtered results as CSV (fetches all pages)
  async function handleExport() {
    try {
      const token = getAuthToken();
      const params = new URLSearchParams({ page: "1", limit: "10000" });
      if (searchQuery) params.set("search", searchQuery);
      if (needFilter !== "all") params.set("need", needFilter);

      const res = await fetch(`${API_URL}/api/consultations?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Export failed");
      const result: PaginatedResponse = await res.json();

      if (result.data.length === 0) {
        toast.error("No data to export.");
        return;
      }

      const headers = ["Name", "Email", "Company", "Need", "Timeline", "Budget", "Message", "Date"];
      const rows = result.data.map((c) => [
        c.name,
        c.email,
        c.company || "",
        c.need,
        c.timeline || "",
        c.budget || "",
        (c.message || "").replace(/"/g, '""'),
        new Date(c.createdAt).toLocaleDateString(),
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `consultations_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${result.data.length} records.`);
    } catch {
      toast.error("Export failed.");
    }
  }

  function clearFilters() {
    setSearchInput("");
    setSearchQuery("");
    setNeedFilter("all");
    setPage(1);
  }

  const hasActiveFilters = searchQuery !== "" || needFilter !== "all";
  const startRecord = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const endRecord = Math.min(page * PER_PAGE, total);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Consultations</h1>
          <p className="text-muted-foreground">
            Manage and respond to all inbound consultation requests.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, company..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>
            </div>
            <div className="w-[200px]">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Service Need</label>
              <Select
                value={needFilter}
                onValueChange={(v) => {
                  setNeedFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {uniqueNeeds.map((need) => (
                    <SelectItem key={need} value={need}>
                      {need}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 gap-1 text-muted-foreground">
                <X className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle>Inbound Leads</CardTitle>
          <CardDescription>
            {loading ? "Loading..." : `Showing ${startRecord}–${endRecord} of ${total} total requests.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-accent/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px]">Client</TableHead>
                  <TableHead>Primary Need</TableHead>
                  <TableHead>Timeline / Budget</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <p>Loading consultations...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : consultations.length > 0 ? (
                  consultations.map((c) => (
                    <TableRow key={c.id} className="group hover:bg-accent/5 transition-colors border-border/40">
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-foreground">{c.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {c.email}
                          </span>
                          {c.company && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1 italic">
                              <Building className="h-3 w-3" /> {c.company}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-medium">
                          {c.need}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{c.timeline || "Not specified"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <DollarSign className="h-3 w-3 text-emerald-500" />
                            <span>{c.budget || "Not specified"}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium font-mono text-muted-foreground">
                          {new Date(c.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer"
                              onClick={() => window.open(`mailto:${c.email}?subject=Re: Your SynSeam Consultation`)}
                            >
                              <Mail className="h-4 w-4" /> Reply via Email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(c.email);
                                toast.success("Email copied to clipboard");
                              }}
                            >
                              <Users className="h-4 w-4" /> Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive gap-2 cursor-pointer"
                              onClick={() => setDeleteConfirmId(c.id)}
                            >
                              Delete Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="h-10 w-10 opacity-10" />
                        <p>No consultation requests found.</p>
                        {hasActiveFilters && (
                          <Button variant="link" size="sm" onClick={clearFilters}>
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first, last, and pages near current
                      return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                    })
                    .reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
                      if (i > 0 && p - (arr[i - 1] as number) > 1) {
                        acc.push("ellipsis");
                      }
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((item, i) =>
                      item === "ellipsis" ? (
                        <span key={`e-${i}`} className="px-1 text-muted-foreground">…</span>
                      ) : (
                        <Button
                          key={item}
                          variant={page === item ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setPage(item)}
                        >
                          {item}
                        </Button>
                      ),
                    )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-card border-border/40">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this consultation
              request and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="bg-accent/50 hover:bg-accent border-0">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                if (deleteConfirmId) handleDelete(deleteConfirmId);
              }} 
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
