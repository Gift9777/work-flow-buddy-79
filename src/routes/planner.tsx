import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AiToolShell } from "@/components/ai-tool";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  component: PlannerPage,
  head: () => ({
    meta: [
      { title: "AI Task Planner — Flowdesk AI" },
      { name: "description", content: "Organize tasks into a prioritized daily or weekly schedule." },
    ],
  }),
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [mode, setMode] = useState<"daily" | "weekly">("daily");

  return (
    <PageShell
      title="AI Task Planner"
      subtitle="List your tasks — we'll turn them into a prioritized schedule."
    >
      <AiToolShell
        title="Your tasks"
        description="One task per line. Include deadlines or priority if you can."
        icon={<CalendarClock className="h-5 w-5" />}
        outputLabel="Suggested schedule"
        outputPlaceholder="A prioritized schedule will appear here…"
        buildPrompt={() => {
          if (!tasks.trim()) {
            toast.error("Please list at least one task.");
            return null;
          }
          return {
            system:
              "You are an AI productivity assistant. Turn a list of tasks into a prioritized schedule in Markdown. For weekly: use ## headings for Monday through Friday. For daily: use ## for time blocks (e.g. 9:00 - 10:30). For each task include the task name, why it's prioritized there (urgency/importance), and estimated duration. End with a short 'Tips' section.",
            prompt: `Organize the following tasks into a ${mode} schedule. Prioritize by urgency, importance, and deadlines. Present the schedule in a clear, organized Markdown format.\n\nTasks:\n${tasks.trim()}`,
          };
        }}
        inputs={
          <>
            <div className="space-y-2">
              <Label>Schedule type</Label>
              <RadioGroup
                value={mode}
                onValueChange={(v) => setMode(v as "daily" | "weekly")}
                className="grid grid-cols-2 gap-2"
              >
                {(["daily", "weekly"] as const).map((m) => (
                  <label
                    key={m}
                    htmlFor={`mode-${m}`}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm capitalize transition-colors ${
                      mode === m ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    }`}
                  >
                    <RadioGroupItem id={`mode-${m}`} value={m} />
                    {m}
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks</Label>
              <Textarea
                id="tasks"
                placeholder={"e.g.\n- Finish Q3 report (due Friday)\n- Prepare client demo\n- Reply to procurement emails\n- 1:1 prep for Monday"}
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                className="min-h-[240px] font-mono text-sm"
              />
            </div>
          </>
        }
      />
    </PageShell>
  );
}
