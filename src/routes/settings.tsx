import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — Flowdesk AI" }] }),
});

function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Personalize your workspace." showDisclaimer={false}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Switch between light and dark mode.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">Theme</span>
            <ThemeToggle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Displayed in generated content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Jane Doe" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Product Manager" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Fine-tune AI behavior.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Verbose output</p>
                <p className="text-xs text-muted-foreground">More detailed AI responses.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Save history</p>
                <p className="text-xs text-muted-foreground">Keep past generations locally.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
