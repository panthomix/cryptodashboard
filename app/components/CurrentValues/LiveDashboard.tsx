"use client";
import React from "react";
import Image from "next/image";
import { Chart } from "react-google-charts";
import SpinnerGIF from "@/app/assets/images/spinner.gif";
import ErrorImg from "@/app/assets/images/error.png";
import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import { CurrenciesLists } from "@/app/types";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = [["x", "BTC", "ETH"]] as any[];
  rawData.dates.forEach((date) => {
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
  const isReady = rawData.dates.length > 1;
  const hasError = rawData.error;

  return (
    <div className="w-full border-2 bg-slate-50 rounded border-slate-600 h-[400px] my-auto flex justify-center">
      {!isReady && !hasError && (
        <div className="flex flex-col items-center my-auto">
          <span>Connecting with real time data</span>
          <span>Please wait</span>
          <Image src={SpinnerGIF} alt="me" width="64" height="64" />
        </div>
      )}
      {hasError && (
        <div className="flex flex-col items-center my-auto">
          <span>{hasError}</span>

          <Image src={ErrorImg} alt="me" width="64" height="64" />
        </div>
      )}
      {isReady && !hasError && (
        <>
          <Chart
            chartType="LineChart"
            data={data}
            width="100%"
            height="400px"
            options={options}
          />
        </>
      )}
    </div>
  );
}
