import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { toast } from "sonner";

export default function EditClientPage() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const clientId = params.id ?? "";
  const { data: client, isLoading } = trpc.clients.getById.useQuery({ id: clientId }, { enabled: !!clientId });
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [company, setCompany] = useState(""); const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState(""); const [addressLine2, setAddressLine2] = useState(""); const [city, setCity] = useState(""); const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState(""); const [paymentTerms, setPaymentTerms] = useState(30); const [notes, setNotes] = useState(""); const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (client && !initialized) {
      setName(client.name); setEmail(client.email); setCompany(client.company || ""); setPhone(client.phone || ""); setAddressLine1(client.addressLine1 || ""); setAddressLine2(client.addressLine2 || "");
      setCity(client.city || ""); setPostcode(client.postcode || ""); setCountry(client.country || "United Kingdom"); setPaymentTerms(client.paymentTerms); setNotes(client.notes || ""); setInitialized(true);
    }
  }, [client, initialized]);

  const updateClient = trpc.clients.update.useMutation({ onSuccess: () => { toast.success("Client updated"); setLocation(`/clients/${clientId}`); }, onError: err => toast.error(err.message) });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { toast.error("Name and email are required"); return; }
    updateClient.mutate({ id: clientId, name: name.trim(), email: email.trim(), company: company.trim() || null, phone: phone.trim() || null, addressLine1: addressLine1.trim() || null, addressLine2: addressLine2.trim() || null, city: city.trim() || null, postcode: postcode.trim() || null, country: country.trim() || null, paymentTerms, notes: notes.trim() || null });
  };

  if (isLoading) return <div className="space-y-4" aria-busy="true" aria-label="Loading client"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (!client) return <div className="text-center py-12" role="alert"><p className="text-muted-foreground">Client not found</p></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" aria-label="Back to client" onClick={() => setLocation(`/clients/${clientId}`)}><ArrowLeft className="h-4 w-4" aria-hidden="true" /></Button>
        <div><h1 className="text-2xl font-bold tracking-tight">Edit Client</h1><p className="text-muted-foreground text-sm mt-1">Update {client.name}&apos;s details</p></div>
      </div>

      <form onSubmit={handleSubmit} aria-label="Edit client" className="space-y-6">
        <Card><CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="edit-client-name">Name <span aria-hidden="true">*</span></Label><Input id="edit-client-name" value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="edit-client-email">Email <span aria-hidden="true">*</span></Label><Input id="edit-client-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="edit-client-company">Company</Label><Input id="edit-client-company" value={company} onChange={e => setCompany(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-client-phone">Phone</Label><Input id="edit-client-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
          </div>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="text-base">Address</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="edit-address-line-1">Address Line 1</Label><Input id="edit-address-line-1" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="edit-address-line-2">Address Line 2</Label><Input id="edit-address-line-2" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label htmlFor="edit-client-city">City</Label><Input id="edit-client-city" value={city} onChange={e => setCity(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-client-postcode">Postcode</Label><Input id="edit-client-postcode" value={postcode} onChange={e => setPostcode(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-client-country">Country</Label><Input id="edit-client-country" value={country} onChange={e => setCountry(e.target.value)} /></div>
          </div>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="text-base">Payment & Notes</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="edit-payment-terms">Payment Terms (days)</Label><Input id="edit-payment-terms" type="number" value={paymentTerms} onChange={e => setPaymentTerms(Number(e.target.value))} min={1} max={365} /></div>
          <div className="space-y-2"><Label htmlFor="edit-client-notes">Notes</Label><Textarea id="edit-client-notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} /></div>
        </CardContent></Card>

        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => setLocation(`/clients/${clientId}`)}>Cancel</Button><Button type="submit" disabled={updateClient.isPending} aria-busy={updateClient.isPending}>{updateClient.isPending ? "Saving…" : "Save Changes"}</Button></div>
      </form>
      <div role="status" aria-live="polite" className="sr-only">{updateClient.isPending ? "Saving client changes" : ""}</div>
    </div>
  );
}
