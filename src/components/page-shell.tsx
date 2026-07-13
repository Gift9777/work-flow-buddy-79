import type { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export function PageShell({
  title,
  subtitle,
  children,
  showDisclaimer = true,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showDisclaimer?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </header>
      {showDisclaimer && (
        <Alert className="border-warning/40 bg-warning/10 text-foreground">
          <ShieldAlert className="h-4 w-4 text-warning" />
          <AlertDescription className="text-xs sm:text-sm">
            <strong>Disclaimer:</strong> AI-generated content may contain inaccuracies. Review,
            verify, and edit all output before using it for professional communication. Do not
            enter confidential or sensitive business information into AI prompts.
          </AlertDescription>
        </Alert>
      )}
      {children}
    </div>
  );
}
