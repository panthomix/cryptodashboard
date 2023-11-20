import { createSlice } from "@reduxjs/toolkit";
import {
  CryptosType,
  CurrenciesType,
  CurrencyEnum,
} from "../services/constants";
import { Currencies, HistoricalValues } from "../../types";
import { transformDate } from "@/app/utils/helpers";

interface InitialStateProps {
  selectedCrypto: CryptosType;
  selectedCurrency: CurrenciesType;
  historicalBTC: HistoricalValues[];
  historicalETH: HistoricalValues[];
  latestBTC: Omit<HistoricalValues, "date">;
  latestETH: Omit<HistoricalValues, "date">;
}

const emptyLatest = {
  date: "",
  [CurrencyEnum.USD]: 0,
  [CurrencyEnum.EUR]: 0,
  [CurrencyEnum.BTC]: 0,
};

const initialState: InitialStateProps = {
  selectedCrypto: "BTC",
  selectedCurrency: "USD",
  historicalBTC: [],
  historicalETH: [],
  latestBTC: emptyLatest,
  latestETH: emptyLatest,
};

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    setSelectCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setSelectCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setNewHistoricalValues: (state, action) => {
      const data = action.payload as Currencies;
      state.historicalBTC.unshift({
        date: transformDate(new Date()),
        ...data.BTC,
      });
      if (state.historicalBTC.length > 20) {
        state.historicalBTC.pop();
      }
      state.historicalETH.unshift({
        date: transformDate(new Date()),
        ...data.ETH,
      });
      if (state.historicalETH.length > 20) {
        state.historicalETH.pop();
      }
      state.latestBTC = data.BTC;
      state.latestETH = data.ETH;
    },
  },
});

export const { setSelectCrypto, setSelectCurrency, setNewHistoricalValues } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
