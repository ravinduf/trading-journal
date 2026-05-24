export const PORTFOLIO_SUMMARY = {
  totalNetWorth: 142_583.42,
  changePercent: 12.4,
  changeAmount: 15_720.1,
  dayChange: -1_204,
  assetsCount: 12,
  totalProfit: 15_720.1,
  totalProfitPercent: 12.4,
} as const;

export const ALLOCATION = [
  { key: "bitcoin", name: "Bitcoin", symbol: "BTC", value: 91_253, percent: 64, color: "#c5c7c8" },
  { key: "ethereum", name: "Ethereum", symbol: "ETH", value: 32_104, percent: 22, color: "#c3cfeb" },
  { key: "solana", name: "Solana", symbol: "SOL", value: 14_500, percent: 10, color: "#6e739b" },
  { key: "others", name: "Others", symbol: "—", value: 4_726, percent: 4, color: "#1c1d2b" },
] as const;

export const GROWTH_RANGES = ["1D", "7D", "1M", "6M", "1Y", "ALL"] as const;

export type GrowthRange = (typeof GROWTH_RANGES)[number];

export const GROWTH_DATA: Record<GrowthRange, { date: string; value: number }[]> = {
  "1D": [
    { date: "00:00", value: 141_200 },
    { date: "04:00", value: 141_450 },
    { date: "08:00", value: 141_100 },
    { date: "12:00", value: 142_050 },
    { date: "16:00", value: 142_320 },
    { date: "20:00", value: 142_583 },
  ],
  "7D": [
    { date: "Mon", value: 138_400 },
    { date: "Tue", value: 139_100 },
    { date: "Wed", value: 140_250 },
    { date: "Thu", value: 139_800 },
    { date: "Fri", value: 141_500 },
    { date: "Sat", value: 142_100 },
    { date: "Sun", value: 142_583 },
  ],
  "1M": [
    { date: "Oct 15", value: 126_863 },
    { date: "Oct 22", value: 128_420 },
    { date: "Oct 29", value: 131_200 },
    { date: "Nov 05", value: 135_880 },
    { date: "Nov 12", value: 138_450 },
    { date: "Today", value: 142_583 },
  ],
  "6M": [
    { date: "May", value: 98_200 },
    { date: "Jun", value: 105_400 },
    { date: "Jul", value: 112_800 },
    { date: "Aug", value: 118_500 },
    { date: "Sep", value: 128_900 },
    { date: "Oct", value: 142_583 },
  ],
  "1Y": [
    { date: "Q1", value: 82_400 },
    { date: "Q2", value: 94_200 },
    { date: "Q3", value: 118_600 },
    { date: "Q4", value: 142_583 },
  ],
  ALL: [
    { date: "2022", value: 45_200 },
    { date: "2023", value: 78_900 },
    { date: "2024", value: 112_400 },
    { date: "2025", value: 142_583 },
  ],
};

export const HOLDINGS = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "bitcoin" as const,
    iconColor: "text-orange-400",
    avgPrice: 42_350,
    balance: 1.248,
    balanceLabel: "1.248 BTC",
    value: 86_410.22,
    pnl: 24_150,
    pnlPercent: 28.5,
    trades: [
      { type: "buy" as const, date: "Nov 12, 2023", price: 38_200, amount: "0.500 BTC" },
      { type: "buy" as const, date: "Jan 04, 2024", price: 45_100, amount: "0.748 BTC" },
    ],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "diamond" as const,
    iconColor: "text-blue-400",
    avgPrice: 2_840.12,
    balance: 8.5,
    balanceLabel: "8.50 ETH",
    value: 20_540.32,
    pnl: -1_450,
    pnlPercent: -4.2,
    trades: [],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "bolt" as const,
    iconColor: "text-purple-400",
    balance: 120,
    balanceLabel: "120.00 SOL",
    avgPrice: 125.4,
    value: 15_048,
    pnl: 6_402.1,
    pnlPercent: 72.1,
    trades: [],
  },
] as const;

export const RECENT_TRADES = [
  {
    id: "1",
    type: "sell" as const,
    title: "Sold 2.0 ETH",
    time: "2 hours ago",
    value: "$5,680.24",
    valueClass: "text-[#c5c7c8]",
  },
  {
    id: "2",
    type: "reward" as const,
    title: "Staking Rewards (SOL)",
    time: "12 hours ago",
    value: "+0.42 SOL",
    valueClass: "text-emerald-400",
  },
] as const;

export function formatCurrency(value: number, compact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 2,
  }).format(value);
}

export function formatSignedCurrency(value: number) {
  const prefix = value >= 0 ? "+$" : "-$";
  return `${prefix}${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
