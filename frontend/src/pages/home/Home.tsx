import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { LineChart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import AppHeader, { APP_NAME } from "@/components/custom/appHeader/AppHeader";

gsap.registerPlugin(useGSAP);

const TICKER_ITEMS = [
  { pair: "BTC/USDT", change: "+2.45%", price: "67,432.12", up: true },
  { pair: "ETH/USDT", change: "-1.12%", price: "3,541.80", up: false },
  { pair: "SOL/USDT", change: "+5.82%", price: "148.92", up: true },
  { pair: "LINK/USDT", change: "+0.25%", price: "18.45", up: true },
  { pair: "ARB/USDT", change: "-4.32%", price: "1.12", up: false },
] as const;

const Home = () => {
  // Outer wrapper (overflow hidden): useGSAP scopes context cleanup to this subtree.
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  // Inner row: two identical ticker segments side by side; we animate translateX.
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = tickerTrackRef.current;
      if (!track) return;

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
    { scope: tickerContainerRef }
  );

  return (
    <div className="min-h-screen bg-[#11121f] font-[Inter,system-ui,sans-serif] text-[#e2e1f3] selection:bg-white selection:text-[#11121f]">
      <main
        className={cn(
          "min-h-screen",
          "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]",
          "bg-size-[40px_40px]"
        )}
      >
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-8 py-32 text-center lg:py-48">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
          <div className="relative z-10 max-w-4xl">
            <AppHeader variant="hero" as="h1" />
            <h2 className="mb-12 font-['Orbitron',sans-serif] text-xl font-medium tracking-[0.2em] text-gray-500 uppercase md:text-2xl">
              Your Path to{" "}
              <span className="text-gray-400">Becoming the Edge</span>
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400">
              Journal your crypto trades. Decode your patterns. Track performance
              across spot and futures. Stay sharp with market insights and news.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-auto rounded-lg border-0 bg-white px-8 py-4 font-['Orbitron',sans-serif] text-sm font-bold tracking-tighter text-[#2f3131] shadow-none hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
              >
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-lg border border-white/10 bg-[rgba(40,41,54,0.6)] px-8 py-4 font-['Orbitron',sans-serif] text-sm font-bold tracking-tighter text-white backdrop-blur-md hover:bg-white/5 active:scale-95"
              >
                <Link to="/auth/signup">Signup</Link>
              </Button>
            </div>
          </div>
        </section>

        <div
          ref={tickerContainerRef}
          className="w-full overflow-hidden border-y border-white/5 bg-[#191b27] py-3 whitespace-nowrap"
        >
          <div ref={tickerTrackRef} className="flex w-max gap-12 will-change-transform">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-12">
                {TICKER_ITEMS.map((row) => (
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

        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#191b27] p-8 transition-all hover:bg-[#1d1f2c] md:col-span-8">
              <div className="relative z-10">
                <Wallet
                  className="mb-4 size-8 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mb-4 font-['Orbitron',sans-serif] text-2xl font-bold text-white">
                  Spot Tracking Mastery
                </h3>
                <p className="mb-6 max-w-md text-gray-400">
                  Seamlessly aggregate your holdings across multiple CEXs and cold
                  wallets. Real-time valuation and historical performance
                  visualization.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-['Space_Grotesk',sans-serif] text-xs tracking-widest text-gray-400 uppercase">
                    Asset Allocation
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-['Space_Grotesk',sans-serif] text-xs tracking-widest text-gray-400 uppercase">
                    PnL Heatmap
                  </span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 opacity-20 transition-transform group-hover:scale-110">
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdEqw4fGtEAh7EeyiH1Q7KCA7dhCeL4lwxt2gjfihywBzr31Jwb1uVsyvNry1knulJn7Qfz7ocH7GcnszBqXpze8RQJra659mdE9s2K0U-4JoavDnAU1md0cFjgsxmZSPcNOO5j_yYwrQaje75pySSysRQn7TEcGFFCkr68B8oHRY8d28dVt7fjLnJXYhjZ_5lXX_zxyqkxPq62MQ6IdfXrfoxaSjZA421s8rFV4Cpi9mS_PbSI_nWnfyXTatNf__jzeB6uU4ORZoB"
                />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#333442] p-8 transition-all md:col-span-4">
              <div className="relative z-10 flex h-full flex-col">
                <LineChart
                  className="mb-4 size-8 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mb-4 font-['Orbitron',sans-serif] text-2xl font-bold text-white">
                  Futures Journal
                </h3>
                <p className="mb-auto text-sm text-gray-400">
                  Track leverage, liquidation points, and emotional triggers. Stop
                  guessing. Start executing with data-backed confidence.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#141523] p-8 md:col-span-4">
              <div className="relative z-10">
                <h3 className="mb-6 border-b border-white/10 pb-4 font-['Orbitron',sans-serif] text-lg font-bold tracking-wider text-white uppercase">
                  Live Insights
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-1 shrink-0 bg-green-500" />
                    <div>
                      <p className="mb-1 font-['Space_Grotesk',sans-serif] text-xs text-gray-500 uppercase">
                        08:42 AM - WHALE WATCH
                      </p>
                      <p className="text-sm font-medium text-gray-300">
                        1,200 BTC moved from Unknown Wallet to Coinbase.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-1 shrink-0 bg-red-500" />
                    <div>
                      <p className="mb-1 font-['Space_Grotesk',sans-serif] text-xs text-gray-500 uppercase">
                        08:15 AM - LIQUIDATION
                      </p>
                      <p className="text-sm font-medium text-gray-300">
                        $42M Longs liquidated in the last 15 mins.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-50">
                    <div className="h-10 w-1 shrink-0 bg-white" />
                    <div>
                      <p className="mb-1 font-['Space_Grotesk',sans-serif] text-xs text-gray-500 uppercase">
                        07:50 AM - NEWS
                      </p>
                      <p className="text-sm font-medium text-gray-300">
                        SEC updates ETF filing requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#191b27] p-8 md:col-span-8">
              <div className="flex h-full flex-col items-center gap-8 md:flex-row">
                <div className="md:w-full">
                  <h3 className="mb-4 font-['Orbitron',sans-serif] text-2xl font-bold text-white">
                    Decode Your DNA
                  </h3>
                  <p className="mb-6 max-w-2xl text-gray-400">
                    Our proprietary algorithm analyzes your trade history to find
                    your unique strengths and fatal flaws. Know when you&apos;re
                    most profitable and why.
                  </p>
                  <div className="grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded border border-white/5 bg-[#333442] p-4">
                      <span className="block font-['Orbitron',sans-serif] text-2xl text-white">
                        72%
                      </span>
                      <span className="font-['Space_Grotesk',sans-serif] text-[10px] tracking-widest text-gray-500 uppercase">
                        Win Rate (London)
                      </span>
                    </div>
                    <div className="rounded border border-white/5 bg-[#333442] p-4">
                      <span className="block font-['Orbitron',sans-serif] text-2xl text-white">
                        1.8
                      </span>
                      <span className="font-['Space_Grotesk',sans-serif] text-[10px] tracking-widest text-gray-500 uppercase">
                        Avg Risk/Reward
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-[#11121f] px-8 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <AppHeader variant="footer" as="span" />
              <p className="mt-2 font-['Space_Grotesk',sans-serif] text-xs text-gray-600">
                © 2024 {APP_NAME} ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Protocol
                </p>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Manifesto
                </a>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Documentation
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Network
                </p>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Twitter (X)
                </a>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Discord
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Security
                </p>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Privacy
                </a>
                <a
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                  href="#"
                >
                  Terms
                </a>
              </div>
            </div>
           
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
