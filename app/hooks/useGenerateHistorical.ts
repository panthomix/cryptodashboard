import { useAppDispatch } from "../store/hooks";
import { setNewHistoricalValues } from "../store/reducers/dashboard";
import { useFetchCurrenciesQuery } from "../store/services/cryptoWS";
import { useEffect } from "react";

export default function useGenerateHistorical() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useFetchCurrenciesQuery(undefined, {
    pollingInterval: 10000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setNewHistoricalValues(data));
    }
  }, [isLoading, data, dispatch]);
}
