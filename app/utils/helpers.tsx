import { format } from "date-fns";

export const getDateRounded = (date: Date) => {
  // const newDate = date.setSeconds(Math.round(date.getSeconds() / 5) * 5);
  // return format(newDate, "yyyy-MM-dd HH:mm:ss");
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
