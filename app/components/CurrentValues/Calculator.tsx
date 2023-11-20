import React, { useEffect } from "react";
import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import { CryptoEnum, CurrencyEnum } from "@/app/store/services/constants";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setSelectCrypto,
  setSelectCurrency,
} from "@/app/store/reducers/dashboard";

const getLastCurrencyValue = (data: any, crypto: string, currency: string) => {
  if (!data) return 0;
  return parseFloat(
    Object.values(data[crypto][currency] || {})[
      Object.values(data[crypto][currency] || {}).length - 1
    ]
  );
};

export default function Calculator() {
  const [currencyValue, setCurrencyValue] = React.useState<number>();
  const [cryptoValue, setCryptoValue] = React.useState<number>();
  const { selectedCurrency, selectedCrypto } = useAppSelector(
    (state) => state.dashboard
  );
  const { data: rawData } = useGetCurrenciesUpdatesQuery();
  const dispatch = useAppDispatch();

  const lastBTCValue = getLastCurrencyValue(
    rawData,
    CryptoEnum.BTC,
    selectedCurrency
  );
  const lastETHValue = getLastCurrencyValue(
    rawData,
    CryptoEnum.ETH,
    selectedCurrency
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
            setCryptoValue(
              currencyValue /
                getLastCurrencyValue(
                  rawData,
                  selectedCrypto,
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
            if (!value) {
              setCryptoValue(0);
              // setCurrencyValue(0);
              return;
            }
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
            setCurrencyValue(
              cryptoValue *
                getLastCurrencyValue(
                  rawData,
                  value as CryptoEnum,
                  selectedCurrency
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
