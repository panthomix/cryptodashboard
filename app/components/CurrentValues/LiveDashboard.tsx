"use client";
import React from "react";
import { Chart } from "react-google-charts";
import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import { CurrenciesLists } from "@/app/store/services/types/services";
import { CurrencyEnum } from "@/app/store/services/constants";
import { useAppSelector } from "@/app/store/hooks";

const options = {
  hAxis: {
    title: "DateTime",
  },
  vAxis: {
    title: "Value",
  },
  series: {
    1: { curveType: "function" },
  },
  interpolateNulls: true,
};

const generateData = (
  rawData: CurrenciesLists,
  selectedCurrency: CurrencyEnum
) => {
  const data = [["x", "BTC", "ETH"]];
  rawData.dates.forEach((date, index) => {
    data.push([
      date.split(" ")[1],
      rawData.BTC[selectedCurrency][date],
      rawData.ETH[selectedCurrency][date],
    ]);
  });
  return data;
};

export default function LiveDashboard() {
  const { selectedCurrency } = useAppSelector((state) => state.dashboard);
  const { data: rawData } = useGetCurrenciesUpdatesQuery();

  if (!rawData) return null;

  const data = generateData(rawData, selectedCurrency as CurrencyEnum);

  return (
    <div className="w-full border-2 bg-slate-50 rounded border-slate-600">
      <Chart
        chartType="LineChart"
        data={data}
        width="100%"
        height="400px"
        options={options}
      />
    </div>
  );
}
