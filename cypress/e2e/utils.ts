import { API_KEY, API_URL } from "@/app/store/services/constants";

export const fetchCurrencyData = () => {
  return fetch(API_URL, {
    headers: {
      authorization: API_KEY,
    },
  }).then((res) => res.json());
};
