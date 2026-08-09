import { useEffect, useState } from "react";
import { APP_NAME } from "@/components/custom/appHeader/AppHeader";
import { cn } from "@/lib/utils";

const PHASES = [
  "System Initializing",
  "Synchronizing Ledger",
  "Authenticating",
  "Loading Interface",
] as const;

export default function InitialLoadingScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((prev) => (prev + 1) % PHASES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-screen-root">
      {/* Faint geometric mesh */}
      <div className="loading-grid-overlay" />

      {/* Scanline sweep */}
      <div className="loading-scanline" />

      {/* Radial ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,35,70,0.15)_0%,transparent_70%)]" />

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center justify-center">
        {/* Brand wordmark */}
        <div className="flex flex-col items-center">
          <h1
            className={cn(
              "font-orbitron text-5xl font-bold tracking-[0.3em] text-white md:text-7xl",
              "loading-pulse-breathing"
            )}
          >
            {APP_NAME}
          </h1>

          {/* Sync status row */}
          <div className="mt-12 flex items-center gap-6">
            <div className="h-px w-12 bg-white/20" />
            <p className="flex items-center gap-2 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.4em] text-[#9f9d9d]">
              <svg
                className="loading-spin size-3 shrink-0 text-[#9f9d9d]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {PHASES[phase]}
            </p>
            <div className="h-px w-12 bg-white/20" />
          </div>
        </div>

        
      </main>

      {/* Corner decorative anchors */}
      <div className="fixed top-8 left-8 h-4 w-4 border-l border-t border-white/30 opacity-30" />
      <div className="fixed top-8 right-8 h-4 w-4 border-r border-t border-white/30 opacity-30" />
      <div className="fixed bottom-8 left-8 h-4 w-4 border-b border-l border-white/30 opacity-30" />
      <div className="fixed bottom-8 right-8 h-4 w-4 border-b border-r border-white/30 opacity-30" />
    </div>
  );
}
