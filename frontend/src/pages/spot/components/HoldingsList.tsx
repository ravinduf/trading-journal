import { ChevronDown, Coins, Diamond, PlusCircle, PlusSquare, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { HOLDINGS, formatCurrency, formatSignedCurrency } from "../spotData";

const iconMap = {
  bitcoin: Coins,
  diamond: Diamond,
  bolt: Zap,
} as const;

function HoldingIcon({
  icon,
  className,
}: {
  icon: keyof typeof iconMap;
  className?: string;
}) {
  const Icon = iconMap[icon];
  return <Icon className={cn("size-5", className)} />;
}

function HoldingRow({
  holding,
  defaultOpen = false,
}: {
  holding: (typeof HOLDINGS)[number];
  defaultOpen?: boolean;
}) {
  const isPositive = holding.pnl >= 0;

  return (
    <Collapsible defaultOpen={defaultOpen} className="group border-b border-white/5 last:border-0">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="grid w-full cursor-pointer grid-cols-2 items-center px-4 py-5 text-left transition-colors hover:bg-white/2 md:grid-cols-6 md:px-6"
        >
          <div className="col-span-2 flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#1c1d2b]">
              <HoldingIcon icon={holding.icon} className={holding.iconColor} />
            </div>
            <div>
              <h4 className="font-bold tracking-tight text-[#c5c7c8]">{holding.name}</h4>
              <p className="text-xs text-[#a4a8d4]">{holding.symbol}</p>
            </div>
          </div>

          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-[#c5c7c8]">
              {formatCurrency(holding.avgPrice)}
            </p>
          </div>

          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-[#c5c7c8]">{holding.balanceLabel}</p>
            <p className="text-[10px] text-[#a4a8d4]">{formatCurrency(holding.value)}</p>
          </div>

          <div className="text-right">
            <p
              className={cn(
                "text-sm font-bold",
                isPositive ? "text-emerald-400" : "text-[#ec7c8a]"
              )}
            >
              {formatSignedCurrency(holding.pnl)}
            </p>
            <p
              className={cn(
                "text-[10px] uppercase",
                isPositive ? "text-emerald-400/60" : "text-[#ec7c8a]/60"
              )}
            >
              {isPositive ? "+" : ""}
              {holding.pnlPercent}%
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 md:justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-[#c5c7c8] hover:bg-white/5"
              onClick={(event) => event.stopPropagation()}
            >
              <PlusSquare className="size-5" />
            </Button>
            <ChevronDown className="size-5 text-[#a4a8d4] transition-transform group-data-[state=open]:rotate-180" />
          </div>
        </button>
      </CollapsibleTrigger>

      {holding.trades.length > 0 && (
        <CollapsibleContent className="overflow-hidden border-y border-white/5 bg-black/20 px-4 py-4 md:px-12">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a4a8d4]">
              Trade History
            </span>
            <div className="space-y-3">
              {holding.trades.map((trade) => (
                <div
                  key={`${trade.date}-${trade.amount}`}
                  className="flex flex-col gap-3 border-b border-white/5 py-2 text-xs last:border-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-400 hover:bg-emerald-500/10">
                      Buy
                    </Badge>
                    <span className="text-[#a4a8d4]">{trade.date}</span>
                  </div>
                  <div className="flex gap-6 sm:gap-8">
                    <div className="text-right">
                      <p className="text-[9px] uppercase text-[#a4a8d4]">Price</p>
                      <p className="font-medium text-[#e3e3ff]">
                        {formatCurrency(trade.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase text-[#a4a8d4]">Amount</p>
                      <p className="font-medium text-[#e3e3ff]">{trade.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

export default function HoldingsList() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Active Holdings</h2>
          <p className="text-xs text-[#a4a8d4]">Real-time spot portfolio management</p>
        </div>
        <Button className="hidden gap-2 bg-[#c5c7c8] font-bold text-[#3e4142] shadow-lg shadow-white/10 hover:bg-[#b7b9ba] md:inline-flex">
          <PlusCircle className="size-4" />
          Create New Holding
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0c0d1a]">
        <div className="hidden grid-cols-6 border-b border-white/5 bg-black/20 px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-[#a4a8d4] md:grid">
          <div className="col-span-2">Asset</div>
          <div className="text-right">Avg Price</div>
          <div className="text-right">Balance</div>
          <div className="text-right">PNL (Total)</div>
          <div className="text-center">Action</div>
        </div>

        {HOLDINGS.map((holding, index) => (
          <HoldingRow key={holding.id} holding={holding} defaultOpen={index === 0} />
        ))}
      </div>
    </section>
  );
}
