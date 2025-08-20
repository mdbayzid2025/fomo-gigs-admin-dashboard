import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Provided data structure with plain growth values
const generatedYearData = [
  {
    year: 2023,
    data: [
      { month: "January", growth: 70 },
      { month: "February", growth: 35 },
      { month: "March", growth: 102 },
      { month: "April", growth: 87 },
      { month: "May", growth: 90 },
      { month: "June", growth: 100 },
      { month: "July", growth: 75 },
      { month: "August", growth: 110 },
      { month: "September", growth: 65 },
      { month: "October", growth: 85 },
      { month: "November", growth: 95 },
      { month: "December", growth: 105 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "January", growth: 32 },
      { month: "February", growth: 28 },
      { month: "March", growth: 35 },
      { month: "April", growth: 30 },
      { month: "May", growth: 45 },
      { month: "June", growth: 60 },
      { month: "July", growth: 40 },
      { month: "August", growth: 50 },
      { month: "September", growth: 55 },
      { month: "October", growth: 65 },
      { month: "November", growth: 70 },
      { month: "December", growth: 75 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "January", growth: 110 },
      { month: "February", growth: 120 },
      { month: "March", growth: 140 },
      { month: "April", growth: 130 },
      { month: "May", growth: 150 },
      { month: "June", growth: 160 },
      { month: "July", growth: 170 },
      { month: "August", growth: 180 },
      { month: "September", growth: 190 },
      { month: "October", growth: 200 },
      { month: "November", growth: 210 },
      { month: "December", growth: 220 },
    ],
  },
];

export default function MatchedGrowthAreaChart({
  selectedYear,
  selectedMonth,
}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const yearData = generatedYearData.find(
      (data) => data.year === selectedYear
    );
    if (yearData) {
      if (selectedMonth === "All") {
        setChartData(yearData.data);
      } else {
        const filteredData = yearData.data.filter(
          (entry) => entry.month === selectedMonth
        );
        setChartData(filteredData);
      }
    }
  }, [selectedMonth, selectedYear]);

  if (!chartData.length) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="w-full flex justify-center items-center h-64 text-gray-500"
      >
        No data available for the selected year ({selectedYear})
      </div>
    );
  }

  return (
    <div
      className="w-full"
      aria-label={`Area chart showing growth for the year ${selectedYear}`}
      role="img"
    >
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          {/* Define gradient fill */}
          <defs>
            <linearGradient
              id="growthGradient"
              x1="0%"
              y1="0%"
              x2="120%"
              y2="150%"
            >
              <stop offset="5%" stopColor="#CD8085" stopOpacity={1} />
              <stop offset="95%" stopColor="#E8F2FF1A" stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3" />
          <XAxis
            dataKey="month"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />

          <YAxis
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <Tooltip />

          {/* Apply the gradient fill to the Area chart */}
          <Area
            type="monotone"
            dataKey="growth"
            stroke="#CD8085"
            fill="url(#growthGradient)" // Apply the gradient fill
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
