"use client";
import React from "react";
import CurrentValues from "./CurrentValues/CurrentValues";
import HistoricalValues from "./HistoricalValues/HistoricalValues";
import { useGetCurrenciesUpdatesQuery } from "@/app/store/services/cryptoWS";
import useGenerateHistorical from "../hooks/useGenerateHistorical";

export default function CryptoDashboard() {
  const { data, isLoading } = useGetCurrenciesUpdatesQuery();
  useGenerateHistorical();

  return (
    <div className="p-24 pt-12">
      <h1 className="font-bold text-[3rem] text-center pb-4">
        CryptoCurrency Dashboard
      </h1>
      {(!data || isLoading) && <h1 className="text-center">Loading...</h1>}
      {!!data && (
        <div className="flex flex-col items-center gap-y-8">
          <CurrentValues />
          <HistoricalValues />
        </div>
      )}
    </div>
  );
}
