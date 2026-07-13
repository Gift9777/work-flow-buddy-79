import { createServerFn } from "@tanstack/react-start";

type Body = { system?: string; prompt: string };

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator((data: unknown): Body => {
    const d = data as Body;
    if (!d || typeof d.prompt !== "string" || !d.prompt.trim()) {
      throw new Error("Prompt is required");
    }
    return { system: d.system, prompt: d.prompt };
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const messages = [
      ...(data.system ? [{ role: "system", content: data.system }] : []),
      { role: "user", content: data.prompt },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in your Lovable workspace.");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
