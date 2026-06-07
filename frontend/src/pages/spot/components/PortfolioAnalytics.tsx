import { useState } from "react";
import { LineChart, PieChart } from "lucide-react";
import { Area, AreaChart, Cell, Pie, PieChart as RechartsPieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ALLOCATION,
  GROWTH_DATA,
  GROWTH_RANGES,
  PORTFOLIO_SUMMARY,
  formatCurrency,
  formatSignedCurrency,
  type GrowthRange,
} from "../spotData";

const allocationChartConfig = {
  value: { label: "Value" },
  bitcoin: { label: "Bitcoin", color: "#c5c7c8" },
  ethereum: { label: "Ethereum", color: "#c3cfeb" },
  solana: { label: "Solana", color: "#6e739b" },
  others: { label: "Others", color: "#1c1d2b" },
} satisfies ChartConfig;

const growthChartConfig = {
  value: { label: "Portfolio Value", color: "#10b981" },
} satisfies ChartConfig;

const allocationPieData = ALLOCATION.map((item) => ({
  ...item,
  fill: item.color,
}));

function AnalyticsTabToggle() {
  return (
    <TabsList className="h-auto w-auto gap-0 rounded-lg border border-white/5 bg-black/40 p-1 shadow-none">
      <TabsTrigger
        value="allocation"
        className={cn(
          "gap-2 rounded-md border-0 px-3 py-1.5 text-xs font-medium text-[#a4a8d4] shadow-none flex flex-row",
          "data-[state=active]:bg-white/10 data-[state=active]:text-white"
        )}
      >
        <PieChart className="size-4" />
        Allocation
      </TabsTrigger>
      <TabsTrigger
        value="growth"
        className={cn(
          "gap-2 rounded-md border-0 px-3 py-1.5 text-xs font-medium text-[#a4a8d4] shadow-none flex flex-row",
          "data-[state=active]:bg-white/10 data-[state=active]:text-white"
        )}
      >
        <LineChart className="size-4" />
        Growth
      </TabsTrigger>
    </TabsList>
  );
}

function AllocationView() {
  const dominant = ALLOCATION[0];

  return (
    <div className="flex flex-1 flex-col items-center justify-around gap-8 md:flex-row">
      <div className="relative flex size-48 shrink-0 items-center justify-center">
        <ChartContainer
          config={allocationChartConfig}
          className="mx-auto aspect-square h-48 w-48"
        >
          <RechartsPieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={allocationPieData}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={80}
              strokeWidth={4}
              stroke="#11121f"
            >
              {allocationPieData.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-wide text-[#a4a8d4]">{dominant.symbol}</p>
          <p className="text-xl font-bold text-white">{dominant.percent}%</p>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-4 md:w-auto">
        {ALLOCATION.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="size-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            <div>
              <p className="text-[10px] leading-tight font-medium uppercase text-[#a4a8d4]">
                {item.name}
              </p>
              <p className="text-sm font-bold text-[#c5c7c8]">{formatCurrency(item.value)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthView() {
  const [range, setRange] = useState<GrowthRange>("1M");
  const data = GROWTH_DATA[range];

  return (
    <div className="flex min-h-[220px] w-full flex-col justify-end gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#a4a8d4]">
            Total Profit
          </p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatSignedCurrency(PORTFOLIO_SUMMARY.totalProfit)}{" "}
            <span className="ml-1 text-sm font-medium opacity-60">
              +{PORTFOLIO_SUMMARY.totalProfitPercent}%
            </span>
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {GROWTH_RANGES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={cn(
                "rounded px-2 py-1 text-[10px] font-bold transition-colors",
                range === item
                  ? "bg-white/10 text-white"
                  : "text-[#a4a8d4] hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer config={growthChartConfig} className="mt-2 h-48 w-full">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="spotGrowthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#spotGrowthFill)"
            dot={false}
          />
        </AreaChart>
      </ChartContainer>

      <div className="flex justify-between gap-2 overflow-x-auto text-[9px] font-bold tracking-tighter uppercase text-[#a4a8d4]">
        {data.map((point) => (
          <span key={point.date} className="shrink-0">
            {point.date}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioAnalytics() {
  return (
    <Card className="gap-0 border-white/5 bg-[#11121f] py-0 shadow-2xl lg:col-span-2">
      <CardContent className="flex flex-col p-6">
        <Tabs defaultValue="allocation" className="gap-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#a4a8d4]">
              Portfolio Analytics
            </h3>
            <AnalyticsTabToggle />
          </div>

          <TabsContent value="allocation" className="mt-0">
            <AllocationView />
          </TabsContent>
          <TabsContent value="growth" className="mt-0">
            <GrowthView />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
