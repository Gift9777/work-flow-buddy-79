import { useState, type ReactNode } from "react";
import { Copy, RefreshCw, Trash2, Sparkles, Loader2, Check } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAI } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  outputLabel?: string;
  outputPlaceholder?: string;
  buildPrompt: () => { system: string; prompt: string } | null;
  inputs: ReactNode;
};

export function AiToolShell({
  title,
  description,
  icon,
  outputLabel = "AI output",
  outputPlaceholder = "Generated content will appear here…",
  buildPrompt,
  inputs,
}: Props) {
  const generate = useServerFn(generateAI);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    const built = buildPrompt();
    if (!built) return;
    setLoading(true);
    try {
      const res = await generate({ data: built });
      setOutput(res.content || "No response.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs}
          <Button onClick={run} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">{outputLabel}</CardTitle>
            <CardDescription>Editable — review before using.</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={copy} disabled={!output} aria-label="Copy">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={run}
              disabled={loading}
              aria-label="Regenerate"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOutput("")}
              disabled={!output}
              aria-label="Clear"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={outputPlaceholder}
            className="min-h-[420px] resize-none font-mono text-sm leading-relaxed"
          />
        </CardContent>
      </Card>
    </div>
  );
}
