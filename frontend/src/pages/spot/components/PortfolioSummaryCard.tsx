import { TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_SUMMARY, formatCurrency, formatSignedCurrency } from "../spotData";

export default function PortfolioSummaryCard() {
  return (
    <Card className="relative gap-0 overflow-hidden border-white/5 bg-[#11121f] py-0 shadow-2xl lg:col-span-1">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <Wallet className="pointer-events-none absolute top-4 right-4 size-24 text-white/5" />

        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#a4a8d4]">
            Total Net Worth
          </p>
          <h2 className="text-3xl font-bold text-[#c5c7c8] sm:text-4xl">
            {formatCurrency(PORTFOLIO_SUMMARY.totalNetWorth)}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="flex items-center text-sm font-medium text-emerald-400">
              <TrendingUp className="mr-1 size-4" />+{PORTFOLIO_SUMMARY.changePercent}%
            </span>
            <span className="text-xs text-[#a4a8d4]">
              ({formatSignedCurrency(PORTFOLIO_SUMMARY.changeAmount)})
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-between border-t border-white/5 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-tighter text-[#a4a8d4]">Day Change</p>
            <p className="font-medium text-[#ec7c8a]">
              {formatSignedCurrency(PORTFOLIO_SUMMARY.dayChange)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-tighter text-[#a4a8d4]">Assets Count</p>
            <p className="font-medium text-[#c5c7c8]">{PORTFOLIO_SUMMARY.assetsCount} Holdings</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
