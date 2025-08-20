import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Sample data: Journey stats by year (now no month data)
const journeyStatsDataByYear = {
  2023: {
    basic: 610,
    enterprise: 730,
    elevate: 880,
    momentum: 2150,
  },
  2024: {
    basic: 660,
    enterprise: 780,
    elevate: 940,
    momentum: 150,
  },
  2025: {
    basic: 740,
    enterprise: 900,
    elevate: 1065,
    momentum: 360,
  },
};

export default function SubscriptionPieChart({ selectedYear }) {
  // Get the year data for the selected year
  const yearData = journeyStatsDataByYear[selectedYear];

  // Prepare data for Pie chart
  const chartData = [
    { name: "Basic", value: yearData.basic },
    { name: "Enterprise", value: yearData.enterprise },
    { name: "Elevate", value: yearData.elevate },
    { name: "Momentum", value: yearData.momentum },
  ];

  // Define colors for the Pie chart slices
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40"];

  return (
    <div className="w-full flex flex-col items-center">
      <PieChart width={300} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
