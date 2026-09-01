import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

function formatCurrency(value: number | string): string { const num = typeof value === "string" ? parseFloat(value) : value; return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(num); }
function formatDate(date: Date | string): string { return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date)); }
const statusColors: Record<string, string> = { draft: "bg-gray-100 text-gray-700", sent: "bg-blue-100 text-blue-700", paid: "bg-emerald-100 text-emerald-700", overdue: "bg-red-100 text-red-700" };
const statusFilters = ["all", "draft", "sent", "paid", "overdue"] as const;

export default function InvoicesPage() {
  const [, setLocation] = useLocation(); const [statusFilter, setStatusFilter] = useState<string>("all"); const [search, setSearch] = useState("");
  const queryInput = useMemo(() => ({ status: statusFilter as any, search: search || undefined, limit: 50, offset: 0 }), [statusFilter, search]);
  const { data, isLoading } = trpc.invoice.list.useQuery(queryInput);
  return <div className="space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold tracking-tight">Invoices</h1><p className="text-muted-foreground text-sm mt-1">Manage and track all your invoices</p></div><Button type="button" onClick={() => setLocation("/invoices/new")} size="sm"><Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />New Invoice</Button></div>
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm"><label htmlFor="invoice-search" className="sr-only">Search invoices</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" /><Input id="invoice-search" type="search" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
      <div className="flex gap-1.5" role="group" aria-label="Filter invoices by status">{statusFilters.map(s => <Button key={s} type="button" aria-pressed={statusFilter === s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)} className="capitalize text-xs">{s}</Button>)}</div>
    </div>
    <Card><CardContent className="p-0">
      {isLoading ? <div className="p-6 space-y-3" aria-busy="true" aria-label="Loading invoices">{[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div> : !data || data.items.length === 0 ? <div className="text-center py-12 text-muted-foreground"><FileText className="h-10 w-10 mx-auto mb-3 opacity-40" aria-hidden="true" /><p className="text-sm font-medium">No invoices found</p><p className="text-xs mt-1">Create your first invoice to get started</p></div> :
      <div className="overflow-x-auto"><table className="w-full"><caption className="sr-only">Invoices</caption><thead><tr className="border-b bg-muted/30">{["Invoice","Client","Net","VAT","Total","Status","Due Date"].map(h => <th key={h} scope="col" className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">{h}</th>)}</tr></thead><tbody>{data.items.map(inv => <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
        <td className="py-3 px-4"><button type="button" className="font-mono text-sm font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" onClick={() => setLocation(`/invoices/${inv.id}`)}>{inv.number}</button></td>
        <td className="py-3 px-4 text-sm">{inv.clientName || "—"}</td><td className="py-3 px-4 text-sm font-mono text-muted-foreground">{formatCurrency(inv.subtotal)}</td><td className="py-3 px-4 text-sm font-mono text-muted-foreground">{formatCurrency(inv.taxAmount)}</td><td className="py-3 px-4 text-sm font-mono font-semibold">{formatCurrency(inv.total)}</td><td className="py-3 px-4"><Badge variant="secondary" className={`${statusColors[inv.status] || ""} text-xs capitalize`}>{inv.status}</Badge></td><td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(inv.dueDate)}</td>
      </tr>)}</tbody></table></div>}
    </CardContent></Card>
    <div className="sr-only" aria-live="polite" aria-atomic="true">{search ? `Showing search results for ${search}` : `Showing ${data?.items.length ?? 0} invoices`}</div>
  </div>;
}
