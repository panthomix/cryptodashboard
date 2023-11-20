import { HistoricalValues } from "@/app/types";
import React from "react";

interface ExchangeTableProps {
  id: string;
  title: string;
  data: HistoricalValues[];
  keys: (keyof HistoricalValues)[];
}

export default function ExchangeTable({
  id,
  title,
  data,
  keys,
}: ExchangeTableProps) {
  return (
    <div>
      <h3 className="font-semibold pb-4 text-lg">{title}</h3>

      <table
        data-testid={`${id}-table`}
        className="w-full text-sm text-left text-gray-500 border-2 rounded-full border-black"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
            <th className="px-6 py-3">Time</th>
            {keys.map((key) => (
              <th key={key} className="px-6 py-3">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((current) => (
            <tr
              key={current.date}
              className="odd:bg-white  even:bg-gray-50  border-b "
            >
              <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                {current.date}
              </th>
              {keys.map((key) => (
                <td key={key} className="px-6 py-2">
                  {current[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
