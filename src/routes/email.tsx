import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AiToolShell } from "@/components/ai-tool";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Flowdesk AI" },
      { name: "description", content: "Draft professional emails with adjustable tone in seconds." },
    ],
  }),
});

function EmailPage() {
  const [tone, setTone] = useState("Formal");
  const [recipient, setRecipient] = useState("");
  const [topic, setTopic] = useState("");

  return (
    <PageShell
      title="Smart Email Generator"
      subtitle="Describe the email — we'll draft it in the tone you want."
    >
      <AiToolShell
        title="Compose"
        description="Fill in the details and generate a first draft."
        icon={<Mail className="h-5 w-5" />}
        outputLabel="Draft email"
        outputPlaceholder="Your AI-drafted email will appear here…"
        buildPrompt={() => {
          if (!topic.trim()) {
            toast.error("Please enter what the email should be about.");
            return null;
          }
          const rec = recipient.trim() || "the recipient";
          return {
            system:
              "You are a professional business communication assistant. Write clear, professional, and grammatically correct emails. Include a subject line prefixed with 'Subject:' on the first line, then a blank line, then the email body with greeting, body paragraphs, and a professional sign-off.",
            prompt: `Write a ${tone.toLowerCase()} email about "${topic.trim()}" for ${rec}. Ensure it is clear, professional, and grammatically correct.`,
          };
        }}
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah, my manager"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">What's the email about?</Label>
              <Textarea
                id="topic"
                placeholder="e.g. Request a deadline extension on the Q3 marketing report"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </>
        }
      />
    </PageShell>
  );
}
