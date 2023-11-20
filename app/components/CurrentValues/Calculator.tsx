import React from "react";
// import { useEffect } from "react";
import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import { CryptoEnum, CurrencyEnum } from "@/app/store/services/constants";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setSelectCrypto,
  setSelectCurrency,
} from "@/app/store/reducers/dashboard";
import { CurrenciesLists } from "@/app/types";

const getLastCurrencyValue = (
  data: CurrenciesLists,
  crypto: CryptoEnum,
  currency: CurrencyEnum
) => {
  if (!data) return 0;

  Object.values(data[crypto][currency]);

  return parseFloat(
    `${
      Object.values(data[crypto][currency] || {})[
        Object.values(data[crypto][currency] || {}).length - 1
      ]
    }`
  );
};

export default function Calculator() {
  const [currencyValue, setCurrencyValue] = React.useState<number>();
  const [cryptoValue, setCryptoValue] = React.useState<number>();
  const { selectedCurrency, selectedCrypto } = useAppSelector(
    (state) => state.dashboard
  );
  const { data } = useGetCurrenciesUpdatesQuery();
  const dispatch = useAppDispatch();

  if (!data) return null;

  const lastBTCValue = getLastCurrencyValue(
    data,
    CryptoEnum.BTC,
    selectedCurrency as CurrencyEnum
  );
  const lastETHValue = getLastCurrencyValue(
    data,
    CryptoEnum.ETH,
    selectedCurrency as CurrencyEnum
  );

  // useEffect(() => {
  //   if (!lastBTCValue || !!currencyValue) return;

  //   setCurrencyValue(lastBTCValue);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lastBTCValue, currencyValue]);

  // if (!currencyValue) return null;

  return (
    <div className="w-[500px] border-2 bg-slate-50 rounded border-slate-600">
      <h2 className="text-center p-6 font-semibold text-lg">Calculator</h2>
      <div className="w-full p-4 flex gap-x-2">
        <input
          data-testid="currency-value"
          type="number"
          className="h-6 border-2 border-slate-400"
          value={currencyValue}
          onChange={(e) => {
            const { value } = e.target;
            setCurrencyValue(parseFloat(value));
            setCryptoValue(
              parseFloat(value) /
                (selectedCrypto === CryptoEnum.BTC
                  ? lastBTCValue
                  : lastETHValue)
            );
          }}
        />
        <select
          data-testid="currency-selector"
          className="w-16 h-6 border-2 border-slate-400"
          onChange={(e) => {
            const { value } = e.target;

            dispatch(setSelectCurrency(value));
            if (!currencyValue) return;
            setCryptoValue(
              currencyValue /
                getLastCurrencyValue(
                  data,
                  selectedCrypto as CryptoEnum,
                  value as CurrencyEnum
                )
            );
          }}
        >
          {Object.values(CurrencyEnum)
            .filter((current) => current !== CurrencyEnum.BTC)
            .map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </select>
      </div>
      <div className="w-full p-4 flex gap-x-2">
        <input
          data-testid="crypto-value"
          type="number"
          className="h-6 border-2 border-slate-400"
          value={cryptoValue}
          onChange={(e) => {
            const { value } = e.target;
            setCryptoValue(parseFloat(value));
            setCurrencyValue(
              parseFloat(value) *
                (selectedCrypto === CryptoEnum.BTC
                  ? lastBTCValue
                  : lastETHValue)
            );
          }}
        />
        <select
          data-testid="crypto-selector"
          className="w-16 h-6 border-2 border-slate-400"
          onChange={(e) => {
            const { value } = e.target;
            dispatch(setSelectCrypto(value));
            if (!cryptoValue) return;
            setCurrencyValue(
              cryptoValue *
                getLastCurrencyValue(
                  data,
                  value as CryptoEnum,
                  selectedCurrency as CurrencyEnum
                )
            );
          }}
        >
          {Object.values(CryptoEnum).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
