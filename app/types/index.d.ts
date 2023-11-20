import { CryptoEnum, CurrencyEnum } from "../store/services/constants";

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
  [date: string]: number;
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

export interface HistoricalValues {
  date: string;
  [CurrencyEnum.USD]: number;
  [CurrencyEnum.EUR]: number;
  [CurrencyEnum.BTC]: number;
}
