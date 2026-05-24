import { BarChart3, Gift, ReceiptText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RECENT_TRADES } from "../spotData";

export default function RecentActivity() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="gap-0 border-white/5 bg-[#11121f] py-0 shadow-none">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <ReceiptText className="size-4 text-[#c5c7c8]" />
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#a4a8d4]">
              Recent Trade Records
            </h3>
          </div>
          <div className="space-y-4">
            {RECENT_TRADES.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      trade.type === "sell"
                        ? "flex size-8 items-center justify-center rounded bg-[#7f2737]/20 text-[#ec7c8a]"
                        : "flex size-8 items-center justify-center rounded bg-emerald-500/10 text-emerald-400"
                    }
                  >
                    {trade.type === "sell" ? (
                      <TrendingUp className="size-4 rotate-180" />
                    ) : (
                      <Gift className="size-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{trade.title}</p>
                    <p className="text-[10px] text-[#a4a8d4]">{trade.time}</p>
                  </div>
                </div>
                <p className={cn("text-xs font-bold", trade.valueClass)}>{trade.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 border-white/5 bg-[#11121f] py-0 shadow-none">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
          <div className="mb-2 flex size-16 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#c5c7c8]">
            <BarChart3 className="size-10" />
          </div>
          <h4 className="text-sm font-bold text-white">Optimize Your Strategy</h4>
          <p className="max-w-[240px] text-xs text-[#a4a8d4]">
            Export your trading data or sync with on-chain providers for advanced tax reporting.
          </p>
          <Button variant="link" className="text-[10px] font-bold tracking-widest uppercase text-[#c5c7c8]">
            View Full Analytics
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
