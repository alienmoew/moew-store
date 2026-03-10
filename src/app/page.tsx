import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gradient-purple">
          Moew Store
        </h1>
        <p className="text-muted-foreground text-lg">
          Modern Gaming Store - Coming Soon
        </p>
      </div>

      <div className="flex gap-4">
        <Button>Browse Games</Button>
        <Button variant="outline">Learn More</Button>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-card border border-border glow-purple">
        <p className="text-sm text-muted-foreground">
          ✨ Design System Test - Purple glow effect
        </p>
      </div>
    </main>
  );
}
