import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AiToolShell } from "@/components/ai-tool";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/meetings")({
  component: MeetingsPage,
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Flowdesk AI" },
      { name: "description", content: "Turn lengthy meeting notes into decisions, action items, and deadlines." },
    ],
  }),
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");

  return (
    <PageShell
      title="Meeting Notes Summarizer"
      subtitle="Paste raw meeting notes and get a structured summary."
    >
      <AiToolShell
        title="Meeting notes"
        description="Paste the full transcript or notes below."
        icon={<FileText className="h-5 w-5" />}
        outputLabel="Structured summary"
        outputPlaceholder="Discussion points, decisions, action items, and deadlines will appear here…"
        buildPrompt={() => {
          if (!notes.trim()) {
            toast.error("Please paste your meeting notes first.");
            return null;
          }
          return {
            system:
              "You are an AI meeting assistant. Summarize meeting notes into clear Markdown with these sections (use ## headings): 'Summary' (2-3 sentences), 'Key Discussion Points' (bullets), 'Decisions Made' (bullets), 'Action Items' (bullets with owner if mentioned), and 'Deadlines' (bullets). Be concise and factual.",
            prompt: `Summarize the following meeting notes:\n\n${notes.trim()}`,
          };
        }}
        inputs={
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Paste meeting notes, transcript, or bullet points…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
        }
      />
    </PageShell>
  );
}
