import React from "react";

import LiveDashboard from "./LiveDashboard";
import Calculator from "./Calculator";
import LatestValues from "./LatestValues";

export default function CurrentValues() {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex gap-x-[40px]">
        <LiveDashboard />
        <Calculator />
      </div>
      <LatestValues />
    </div>
  );
}
