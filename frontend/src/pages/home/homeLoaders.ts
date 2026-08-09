import { CMC_API } from "@/utils/api";
import cmcApiClient from "@/utils/cmcApiClient";

/** Symbols kept in display order for the home ticker. */
const TICKER_SYMBOLS = ["BTC", "ETH", "SOL", "SUI", "BNB", "DOGE", "SHIB", "PEPE"] as const;

export type TickerItem = {
  pair: string;
  change: string;
  price: string;
  up: boolean;
};

type CmcSimplePriceQuote = {
  symbol: string;
  price: number;
  percent_change_24h?: number;
};

type CmcSimplePriceItem = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quotes: CmcSimplePriceQuote[];
};

type CmcSimplePriceResponse = {
  data: CmcSimplePriceItem[];
};

function formatPrice(price: number): string {
  const maxFractionDigits = price < 10 ? 4 : 2;
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxFractionDigits,
  });
}

function formatChange(percent: number): string {
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
}

function mapToTickerItems(assets: CmcSimplePriceItem[]): TickerItem[] {
  const bySymbol = new Map(
    assets.map((asset) => [asset.symbol.toUpperCase(), asset])
  );

  return TICKER_SYMBOLS.flatMap((symbol) => {
    const asset = bySymbol.get(symbol);
    const quote = asset?.quotes?.[0];
    if (!asset || !quote || typeof quote.price !== "number") return [];

    const changePct = quote.percent_change_24h ?? 0;
    return [
      {
        pair: `${asset.symbol}/USDT`,
        change: formatChange(changePct),
        price: formatPrice(quote.price),
        up: changePct >= 0,
      },
    ];
  });
}

/** Fetches latest prices for the home ticker via CMC /v2/simple/price. */
export async function fetchTickerPrices(): Promise<TickerItem[]> {
  const response = await cmcApiClient.get<CmcSimplePriceResponse>(
    CMC_API.endpoints.simplePrice,
    {
      params: {
        symbol: TICKER_SYMBOLS.join(","),
        convert: "USDT",
        include_24h_change: true,
      },
    }
  );

  return mapToTickerItems(response.data.data ?? []);
}

export type HomeLoaderData = {
  tickerItems: TickerItem[];
};

/** React Router loader for `/home`. */
export async function homeLoader(): Promise<HomeLoaderData> {
  try {
    const tickerItems = await fetchTickerPrices();
    return { tickerItems };
  } catch {
    return { tickerItems: [] };
  }
}
