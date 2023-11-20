export const APP_URL = "http://localhost:3000";

export const API_URL =
  "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR,BTC";

export const API_KEY =
  "f41a90cc26ac5d6b86612cba8e98645ce94d5f9e84418e31d94264a9de5ec1c0";

export type CryptosType = "BTC" | "ETH";

export enum CryptoEnum {
  BTC = "BTC",
  ETH = "ETH",
}

export type CurrenciesType = "USD" | "EUR";

export enum CurrencyEnum {
  USD = "USD",
  EUR = "EUR",
  BTC = "BTC",
}
