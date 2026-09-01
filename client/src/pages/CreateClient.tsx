import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function CreateClientPage() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [notes, setNotes] = useState("");

  const createClient = trpc.clients.create.useMutation({
    onSuccess: data => {
      toast.success("Client created successfully");
      setLocation(`/clients/${data?.id}`);
    },
    onError: err => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    createClient.mutate({
      name: name.trim(), email: email.trim(), company: company.trim() || undefined,
      phone: phone.trim() || undefined, addressLine1: addressLine1.trim() || undefined,
      addressLine2: addressLine2.trim() || undefined, city: city.trim() || undefined,
      postcode: postcode.trim() || undefined, country: country.trim() || undefined,
      paymentTerms, notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" aria-label="Back to clients" onClick={() => setLocation("/clients")}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Client</h1>
          <p className="text-muted-foreground text-sm mt-1">Add a new client to your directory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} aria-label="Add client" className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="client-name">Name <span aria-hidden="true">*</span></Label><Input id="client-name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required /></div>
              <div className="space-y-2"><Label htmlFor="client-email">Email <span aria-hidden="true">*</span></Label><Input id="client-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="client-company">Company</Label><Input id="client-company" value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Ltd" /></div>
              <div className="space-y-2"><Label htmlFor="client-phone">Phone</Label><Input id="client-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 20 1234 5678" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Address</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="address-line-1">Address Line 1</Label><Input id="address-line-1" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} placeholder="123 High Street" /></div>
            <div className="space-y-2"><Label htmlFor="address-line-2">Address Line 2</Label><Input id="address-line-2" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} placeholder="Suite 4" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2"><Label htmlFor="client-city">City</Label><Input id="client-city" value={city} onChange={e => setCity(e.target.value)} placeholder="London" /></div>
              <div className="space-y-2"><Label htmlFor="client-postcode">Postcode</Label><Input id="client-postcode" value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="SW1A 1AA" /></div>
              <div className="space-y-2"><Label htmlFor="client-country">Country</Label><Input id="client-country" value={country} onChange={e => setCountry(e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Payment & Notes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="payment-terms">Payment Terms (days)</Label><Input id="payment-terms" type="number" value={paymentTerms} onChange={e => setPaymentTerms(Number(e.target.value))} min={1} max={365} /></div>
            <div className="space-y-2"><Label htmlFor="client-notes">Notes</Label><Textarea id="client-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes about this client..." rows={3} /></div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setLocation("/clients")}>Cancel</Button>
          <Button type="submit" disabled={createClient.isPending} aria-busy={createClient.isPending}>
            {createClient.isPending ? "Creating…" : "Add Client"}
          </Button>
        </div>
      </form>
      <div role="status" aria-live="polite" className="sr-only">{createClient.isPending ? "Creating client" : ""}</div>
    </div>
  );
}
