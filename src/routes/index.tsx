import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarClock, Sparkles, ArrowRight, Zap, Clock, Shield } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft polished emails in seconds with adjustable tone.",
    cta: "Compose email",
  },
  {
    to: "/meetings",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn long notes into decisions, action items, and deadlines.",
    cta: "Summarize notes",
  },
  {
    to: "/planner",
    icon: CalendarClock,
    title: "AI Task Planner",
    desc: "Auto-organize your workload into a daily or weekly schedule.",
    cta: "Plan my week",
  },
] as const;

const stats = [
  { icon: Zap, label: "Faster drafting", value: "10×" },
  { icon: Clock, label: "Time saved / week", value: "5 hrs" },
  { icon: Shield, label: "Editable output", value: "100%" },
];

function Dashboard() {
  return (
    <PageShell
      title="Good to see you 👋"
      subtitle="Your AI-powered workspace for emails, meetings, and planning."
    >
      <section className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/40 to-background p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0 space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Powered by Lovable AI
            </span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Automate the busywork. Focus on the work.
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Three AI copilots designed for professionals — write faster, summarize smarter, and
              plan your day with confidence.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/email">
              Start with an email <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-none">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight">AI Tools</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((t) => (
            <Card
              key={t.to}
              className="group border-border/60 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
            >
              <CardHeader>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-3 text-lg">{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to={t.to}>
                    {t.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
