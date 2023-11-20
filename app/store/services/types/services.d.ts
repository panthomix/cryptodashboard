import { CryptoEnum, CurrencyEnum } from "../constants";

interface CurrenciesMap {
  [CurrencyEnum.USD]: number;
  [CurrencyEnum.EUR]: number;
  [CurrencyEnum.BTC]: number;
}
export interface Currencies {
  [CryptoEnum.BTC]: CurrenciesMap;
  [CryptoEnum.ETH]: CurrenciesMap;
}

export interface DatesValueMap {
  [date: string]: string;
}

export interface CurrenciesDateMap {
  [CurrencyEnum.USD]: DatesValueMap;
  [CurrencyEnum.EUR]: DatesValueMap;
  [CurrencyEnum.BTC]: DatesValueMap;
}

export interface CurrenciesLists {
  [CryptoEnum.BTC]: CurrenciesDateMap;
  [CryptoEnum.ETH]: CurrenciesDateMap;
  dates: string[];
}
