export const BE_API = {
  users: {
    me: "/users/me",
    create: "/users/",
  },
  jwt: {
    create: "/jwt/create/",
  },
  token: {
    refresh: "/token/refresh/",
  },
} as const;

export const CMC_API = {
  baseURL: import.meta.env.VITE_APP_COIN_MARKET_CAP_API_URL,
  key: import.meta.env.VITE_APP_COIN_MARKET_CAP_API_KEY,
  endpoints: {
    simplePrice: "/v2/simple/price",
  }
} as const;
