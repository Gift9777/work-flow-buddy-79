import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  component: HelpPage,
  head: () => ({ meta: [{ title: "Help — Flowdesk AI" }] }),
});

const faqs = [
  {
    q: "How accurate is the AI output?",
    a: "AI-generated content may contain inaccuracies. Always review, verify, and edit output before using it professionally.",
  },
  {
    q: "Is my data private?",
    a: "Prompts are sent to Lovable AI for processing. Do not enter confidential or sensitive business information.",
  },
  {
    q: "Can I edit the generated content?",
    a: "Yes — every output is fully editable, and you can copy, regenerate, or clear it at any time.",
  },
  {
    q: "Which AI powers Flowdesk AI?",
    a: "Flowdesk AI is powered by Lovable AI, using best-in-class language models for productivity tasks.",
  },
];

function HelpPage() {
  return (
    <PageShell title="Help & FAQ" subtitle="Everything you need to know." showDisclaimer={false}>
      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
          <CardDescription>Three quick steps to a more productive day.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {[
            { n: 1, t: "Pick a tool", d: "Email, meetings, or planning." },
            { n: 2, t: "Describe your task", d: "A short prompt is enough." },
            { n: 3, t: "Review & use", d: "Edit before copying or sending." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-border/60 p-4">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {s.n}
              </div>
              <p className="mt-3 text-sm font-medium">{s.t}</p>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </PageShell>
  );
}
