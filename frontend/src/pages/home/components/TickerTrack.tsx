import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { HomeLoaderData } from "../homeLoaders";

gsap.registerPlugin(useGSAP);

const TickerTrack = () => {
  const { tickerItems: items } = useLoaderData() as HomeLoaderData;
  // Outer wrapper (overflow hidden): useGSAP scopes context cleanup to this subtree.
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  // Inner row: two identical ticker segments side by side; we animate translateX.
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = tickerTrackRef.current;
      if (!track || items.length === 0) return;

      let tween: gsap.core.Tween | undefined;

      // (Re)build the loop: measure width, tween by exactly one segment so the duplicate lines up.
      const run = () => {
        tween?.kill();
        gsap.set(track, { x: 0 });
        // scrollWidth is both copies; half is one copy — seamless when repeat snaps back to 0.
        const half = track.scrollWidth / 2;
        if (half < 1) return;
        tween = gsap.to(track, {
          x: -half,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      };

      run();
      // Reflow (viewport, fonts, etc.) changes segment width — restart so speed/distance stay correct.
      const ro = new ResizeObserver(() => {
        run();
      });
      ro.observe(track);

      return () => {
        ro.disconnect();
        tween?.kill();
      };
    },
    { scope: tickerContainerRef, dependencies: [items] }
  );

  if (items.length === 0) {
    return (
      <div className="relative bottom-14 w-full overflow-hidden whitespace-nowrap border-y border-white/5 bg-[#191b27] py-3" />
    );
  }

  return (
    <div
      ref={tickerContainerRef}
      className="relative bottom-14 w-full overflow-hidden whitespace-nowrap border-y border-white/5 bg-[#191b27] py-3"
    >
      <div ref={tickerTrackRef} className="flex w-max gap-12 will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-12">
            {items.map((row) => (
              <div key={`${dup}-${row.pair}`} className="flex items-center gap-4">
                <span className="font-['Orbitron',sans-serif] text-xs font-bold text-white">
                  {row.pair}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs",
                    row.up ? "text-green-400" : "text-red-400"
                  )}
                >
                  {row.change}
                </span>
                <span className="font-mono text-xs text-gray-500">
                  {row.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTrack;
