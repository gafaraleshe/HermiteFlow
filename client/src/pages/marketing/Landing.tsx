import { getLoginUrl } from "@/const";
import {
  Container,
  Eyebrow,
  MButton,
  SectionHeading,
} from "@/marketing/primitives";
import {
  ProductDashboardMock,
  InvoiceComposerMock,
  AutomationMock,
} from "@/marketing/mockups";
import {
  ArrowRight,
  FileText,
  Send,
  CreditCard,
  BarChart3,
  Users,
  ShieldCheck,
  Check,
  Zap,
  Globe,
  Cloud,
  Wallet,
  Bot,
  KeyRound,
} from "lucide-react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "motion/react";
import { ProductShowcase } from "@/marketing/ProductShowcase";
import { Badge, GridOverlay } from "@/brand/primitives";
import { Reveal, Stagger, StaggerItem } from "@/marketing/motion";
import BorderGlow from "@/marketing/BorderGlow";

const features = [
  {
    icon: FileText,
    title: "Beautiful invoices",
    body: "Branded, itemized invoices with automatic VAT, discounts, and multi-currency totals — generated as pixel-perfect PDFs.",
  },
  {
    icon: Send,
    title: "Send in one click",
    body: "Send invoices by email with a branded message and PDF attachment, or share the generated document with your client.",
  },
  {
    icon: CreditCard,
    title: "Track invoice status",
    body: "Keep drafts, sent, paid and overdue invoices organized in one place, with clear totals and due dates.",
  },
  {
    icon: BarChart3,
    title: "Revenue you can see",
    body: "A live dashboard tracks invoice totals, outstanding balances, invoice counts, and overdue accounts.",
  },
  {
    icon: Users,
    title: "Clients, organized",
    body: "Every client, contact, payment term, and invoice history in one place — with a tidy audit trail.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "Authentication, role-based access, validated inputs, and protected server-side operations keep the application locked down.",
  },
];

export default function Landing() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <GridOverlay />
        <Container className="relative pb-[clamp(48px,7vw,90px)] pt-[clamp(64px,11vw,150px)]">
          <motion.div className="flex flex-col items-start" {...rise(0)}>
            <Badge live className="mb-6">
              v1 API — live
            </Badge>
            <h1 className="mkt-display max-w-[16ch] text-[clamp(34px,6.4vw,70px)] text-[var(--mkt-ink)]">
              You decide who gets billed.{" "}
              <em className="not-italic text-[var(--accent)]">
                We handle the rest.
              </em>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.5] text-[var(--mkt-ink-subtle)]">
              HermiteFlow is a CRM and invoicing platform for photographers,
              filmmakers, designers and studios. Manage clients, create branded
              invoices, generate PDFs, and send invoices from one workspace.
              By Gaffy Studios.
            </p>
            <div className="mt-[26px] flex flex-wrap gap-[10px]">
              <MButton size="lg" href={getLoginUrl()}>
                Open HermiteFlow
                <ArrowRight className="h-4 w-4" />
              </MButton>
              <MButton variant="secondary" size="lg" href="/docs">
                Read the docs
              </MButton>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[12.5px] text-[var(--mkt-ink-tertiary)]">
              <Check className="h-3.5 w-3.5" />
              Built as an independent project
              <span className="mx-1 h-1 w-1 rounded-full bg-[var(--mkt-hairline-strong)]" />
              Public API available
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-16 max-w-[1080px]"
            {...rise(0.15)}
          >
            <ProductDashboardMock />
          </motion.div>
        </Container>
      </section>

      {/* ===== Product in action ===== */}
      <ProductShowcase />

      {/* ===== Feature grid ===== */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Everything you need"
            title="A complete billing workflow, end to end"
            description="From the first draft to the final email, HermiteFlow keeps clients, invoices, documents and statuses together."
          />
          <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <StaggerItem
                key={f.title}
                className="mkt-panel group rounded-xl p-6 transition-[colors,transform] duration-300 hover:-translate-y-1 hover:border-[var(--mkt-hairline-strong)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--mkt-hairline)] bg-[var(--mkt-surface-2)] text-[var(--mkt-primary-hover)] transition-colors group-hover:border-[var(--mkt-primary)]/40">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-[18px] font-medium tracking-tight text-[var(--mkt-ink)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--mkt-ink-subtle)]">
                  {f.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== Feature spotlight: composer ===== */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Create</Eyebrow>
              <h2 className="mkt-display mt-4 text-[clamp(28px,4vw,42px)] text-[var(--mkt-ink)]">
                Draft an invoice in seconds, not spreadsheets
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--mkt-ink-subtle)]">
                Pick a client, add line items, and watch totals, VAT, and the
                live PDF preview update as you type. Auto-numbered, brand-ready,
                and correct every time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Automatic VAT and multi-currency totals",
                  "Reusable line items and saved clients",
                  "Live PDF preview with your branding",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15px] text-[var(--mkt-ink-muted)]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mkt-primary)]/15">
                      <Check className="h-3 w-3 text-[var(--mkt-primary-hover)]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MButton variant="secondary" href="/features">
                  Explore the editor
                  <ArrowRight className="h-4 w-4" />
                </MButton>
              </div>
            </div>
            <Reveal delay={0.05}>
              <InvoiceComposerMock />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===== Feature spotlight: automation ===== */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <AutomationMock />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Eyebrow>Automate</Eyebrow>
              <h2 className="mkt-display mt-4 text-[clamp(28px,4vw,42px)] text-[var(--mkt-ink)]">
                Scheduled reminders for invoices
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--mkt-ink-subtle)]">
                Configure reminder schedules and keep invoice follow-ups
                consistent without maintaining a separate spreadsheet or task
                list.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="mkt-panel rounded-lg p-4">
                  <Zap className="h-5 w-5 text-[var(--mkt-primary-hover)]" />
                  <div className="mt-3 text-[15px] font-medium text-[var(--mkt-ink)]">
                    Smart schedules
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--mkt-ink-subtle)]">
                    Trigger reminders by due date or status.
                  </div>
                </div>
                <div className="mkt-panel rounded-lg p-4">
                  <Globe className="h-5 w-5 text-[var(--mkt-primary-hover)]" />
                  <div className="mt-3 text-[15px] font-medium text-[var(--mkt-ink)]">
                    Email delivery
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--mkt-ink-subtle)]">
                    Send invoice emails with branded templates.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Hermite Labs ecosystem ===== */}
      <HermiteLabsSection />

      {/* ===== CTA banner ===== */}
      <section className="pb-28">
        <Container>
          <BorderGlow
            className="px-8 py-16 text-center sm:px-16"
            backgroundColor="var(--mkt-surface-1)"
            borderRadius={24}
            glowColor="232 60 68"
            colors={["#5e6ad2", "#828fff", "#38bdf8"]}
            glowRadius={48}
            glowIntensity={1}
            edgeSensitivity={34}
            coneSpread={26}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(60% 120% at 50% 0%, rgba(94,106,210,0.35), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mkt-display mx-auto max-w-[18ch] text-[clamp(28px,4.5vw,46px)] text-[var(--mkt-ink)]">
                Explore the project
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[17px] text-[var(--mkt-ink-subtle)]">
                See the current product, documentation and public API. Features
                that are not implemented are kept out of the main experience.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MButton size="lg" href={getLoginUrl()}>
                  Open HermiteFlow
                  <ArrowRight className="h-4 w-4" />
                </MButton>
                <MButton variant="secondary" size="lg" href="/docs">
                  View documentation
                </MButton>
              </div>
              <p className="mt-6 text-[13px] text-[var(--mkt-ink-tertiary)]">
                Already have an account?{" "}
                <Link
                  href="/dashboard"
                  className="text-[var(--mkt-primary-hover)] hover:underline"
                >
                  Go to dashboard
                </Link>
              </p>
            </div>
          </BorderGlow>
        </Container>
      </section>
    </>
  );
}

// ── Hermite Labs ecosystem ──────────────────────────────────────────────────

const LABS = {
  canvas: "#0f0f0f",
  card: "#181818",
  hairline: "#2a2a2a",
  primary: "#0007cd",
  glow: "#1a26ff",
  ink: "#ffffff",
  body: "#a8a8a8",
  cyan: "#00d4ff",
  success: "#33d17a",
};

const HERMITE_PRODUCTS = [
  {
    icon: FileText,
    name: "HermiteFlow",
    category: "CRM + Invoicing",
    domain: "flow.hermitelabs.com",
    blurb: "CRM and invoicing for creative businesses.",
    live: true,
  },
  {
    icon: Bot,
    name: "Hermite AI",
    category: "AI tools",
    domain: "",
    blurb: "Planned AI tooling for the wider Hermite suite.",
    live: false,
  },
  {
    icon: KeyRound,
    name: "Hermite Auth",
    category: "Authentication",
    domain: "",
    blurb: "Planned shared authentication across Hermite products.",
    live: false,
  },
  {
    icon: Cloud,
    name: "Hermite Cloud",
    category: "Cloud services",
    domain: "",
    blurb: "Planned storage and hosting services for creative workflows.",
    live: false,
  },
  {
    icon: Wallet,
    name: "Hermite Finance",
    category: "Smart budgeting",
    domain: "",
    blurb: "Planned budgeting and cashflow tooling for creative businesses.",
    live: false,
  },
  {
    icon: BarChart3,
    name: "Hermite Analytics",
    category: "Business intelligence",
    domain: "",
    blurb: "Planned product and revenue analytics for studios.",
    live: false,
  },
];

function HermiteLabsSection() {
  return (
    <section className="pb-24">
      <Container>
        <div
          className="relative overflow-hidden rounded-[28px] border px-6 py-14 sm:px-12"
          style={{ borderColor: LABS.hairline, background: LABS.canvas }}
        >
          <div
            className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
            style={{ background: LABS.glow }}
          />
          <div className="relative text-center">
            <span
              className="inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ borderColor: LABS.hairline, color: LABS.cyan }}
            >
              Hermite Labs
            </span>
            <h2
              className="mkt-display mx-auto mt-5 max-w-[20ch] text-[clamp(28px,4.5vw,46px)]"
              style={{ color: LABS.ink }}
            >
              One platform for your whole creative business
            </h2>
            <p
              className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-relaxed"
              style={{ color: LABS.body }}
            >
              HermiteFlow is the current product. Other Hermite Labs concepts
              remain clearly labelled as planned work until they are ready.
            </p>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HERMITE_PRODUCTS.map(p => (
              <div
                key={p.name}
                className="flex flex-col rounded-2xl border p-6 transition-colors"
                style={{
                  borderColor: p.live ? "rgba(0,7,205,0.5)" : LABS.hairline,
                  background: LABS.card,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: p.live ? "rgba(0,7,205,0.18)" : "#222",
                      color: p.live ? LABS.cyan : LABS.body,
                    }}
                  >
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      borderColor: LABS.hairline,
                      color: p.live ? LABS.success : LABS.body,
                    }}
                  >
                    {p.live ? "Live" : "Planned"}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold" style={{ color: LABS.ink }}>
                  {p.name}
                </h3>
                <p
                  className="text-[12px] font-medium uppercase tracking-wider"
                  style={{ color: LABS.cyan }}
                >
                  {p.category}
                </p>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed" style={{ color: LABS.body }}>
                  {p.blurb}
                </p>
                {p.domain && (
                  <p className="mt-4 font-mono text-[12px]" style={{ color: LABS.cyan }}>
                    {p.domain}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
