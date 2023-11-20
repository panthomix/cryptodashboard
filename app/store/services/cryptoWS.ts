import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_URL, CryptoEnum, CurrencyEnum } from "./constants";
import { CurrenciesLists, Currencies, DatesValueMap } from "../../types";
import { transformDate } from "@/app/utils/helpers";

const transformResponse = (response: Currencies): CurrenciesLists => {
  const date = transformDate(new Date());
  const responseValue = {
    [CryptoEnum.BTC]: {
      [CurrencyEnum.USD]: {
        [date]: response.BTC.USD,
      },
      [CurrencyEnum.EUR]: {
        [date]: response.BTC.EUR,
      },
      [CurrencyEnum.BTC]: {
        [date]: response.BTC.BTC,
      },
    },
    [CryptoEnum.ETH]: {
      [CurrencyEnum.USD]: {
        [date]: response.ETH.USD,
      },
      [CurrencyEnum.EUR]: {
        [date]: response.ETH.EUR,
      },
      [CurrencyEnum.BTC]: {
        [date]: response.ETH.BTC,
      },
    },
    dates: [date],
  };
  return responseValue;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
      Authorization: `Apikey ${API_KEY}`,
    },
  }),
  endpoints: (build) => ({
    fetchCurrencies: build.query<Currencies, void>({
      query: () => ``,
    }),
    getCurrenciesUpdates: build.query<CurrenciesLists, void>({
      query: () => ``,
      transformResponse(response: Currencies) {
        return transformResponse(response);
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(
          "wss://streamer.cryptocompare.com/v2?api_key=" + API_KEY
        );
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.TYPE === "20" && data.MESSAGE === "STREAMERWELCOME") {
              const subRequest = {
                action: "SubAdd",
                subs: [
                  "0~Coinbase~BTC~USD",
                  "0~Coinbase~ETH~USD",
                  "0~Coinbase~BTC~EUR",
                  "0~Coinbase~ETH~EUR",
                  "0~Coinbase~ETH~BTC",
                ],
              };
              ws.send(JSON.stringify(subRequest));
            }
            // eslint-disable-next-line no-console
            if (data.TYPE !== "0") return console.log("Socket status:", data);

            updateCachedData((draft: CurrenciesLists) => {
              const crypto = data.FSYM as keyof CurrenciesLists;
              const currency =
                data.TSYM as keyof CurrenciesLists[typeof crypto];
              const date = transformDate(new Date(data.TS * 1000));
              (draft[crypto][currency][date] as DatesValueMap) = data.P;
              if (!draft.dates.includes(date)) draft.dates.push(date);

              // We only want to keep the 100 dates to avoid memory leaks
              if (draft.dates.length > 100) {
                const oldestDate = draft.dates.shift();
                if (oldestDate) {
                  delete draft.BTC.USD[oldestDate];
                  delete draft.BTC.EUR[oldestDate];
                  delete draft.BTC.BTC[oldestDate];
                  delete draft.ETH.USD[oldestDate];
                  delete draft.ETH.EUR[oldestDate];
                  delete draft.ETH.BTC[oldestDate];
                }
              }
            });
          };
          ws.addEventListener("message", listener);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("🚀 ~ file: cryptoWS.ts:80 ~ e:", e);
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useFetchCurrenciesQuery, useGetCurrenciesUpdatesQuery } = api;
