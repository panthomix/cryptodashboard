import React from "react";
// import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import { useAppSelector } from "@/app/store/hooks";

export default function LatestValues() {
  const { selectedCurrency, latestBTC, latestETH } = useAppSelector(
    (state) => state.dashboard
  );

  const lastBTCValue = latestBTC[selectedCurrency];
  const lastETHValue = latestETH[selectedCurrency];

  // const { data: rawData } = useGetCurrenciesUpdatesQuery();
  // if (!rawData) return null;

  // const lastBTCValue = Object.values(rawData.BTC[selectedCurrency])[
  //   Object.values(rawData.BTC[selectedCurrency]).length - 1
  // ];
  // const lastETHValue = Object.values(rawData.ETH[selectedCurrency])[
  //   Object.values(rawData.ETH[selectedCurrency]).length - 1
  // ];

  return (
    <div className="flex w-full justify-between px-10">
      <h1 className="text-center p-6 font-bold text-xl">
        1 BTC = <span data-testid="btc-currency">{lastBTCValue}</span>
      </h1>
      <h1 className="text-center p-6 font-bold text-xl">
        1 ETH = <span data-testid="eth-currency">{lastETHValue}</span>
      </h1>
    </div>
  );
}
