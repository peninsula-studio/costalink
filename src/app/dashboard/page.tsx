import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="font-extrabold text-5xl tracking-tight">DASHBOARD</h1>

        <div className="flex flex-col items-center gap-2">
          <Button nativeButton={false} render={<Link href="/dashboard"></Link>}>
            Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
