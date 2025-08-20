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

const generatedYearData = [
  {
    year: 2023,
    data: [
      { month: "Jan", growth: 70 },
      { month: "Feb", growth: 35 },
      { month: "Mar", growth: 102 },
      { month: "Apr", growth: 87 },
      { month: "May", growth: 90 },
      { month: "Jun", growth: 100 },
      { month: "Jul", growth: 75 },
      { month: "Aug", growth: 110 },
      { month: "Sep", growth: 65 },
      { month: "Oct", growth: 85 },
      { month: "Nov", growth: 95 },
      { month: "Dec", growth: 105 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "Jan", growth: 32 },
      { month: "Feb", growth: 28 },
      { month: "Mar", growth: 35 },
      { month: "Apr", growth: 30 },
      { month: "May", growth: 45 },
      { month: "Jun", growth: 60 },
      { month: "Jul", growth: 40 },
      { month: "Aug", growth: 50 },
      { month: "Sep", growth: 55 },
      { month: "Oct", growth: 65 },
      { month: "Nov", growth: 70 },
      { month: "Dec", growth: 75 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "Jan", growth: 110 },
      { month: "Feb", growth: 120 },
      { month: "Mar", growth: 140 },
      { month: "Apr", growth: 130 },
      { month: "May", growth: 150 },
      { month: "Jun", growth: 160 },
      { month: "Jul", growth: 170 },
      { month: "Aug", growth: 180 },
      { month: "Sep", growth: 190 },
      { month: "Oct", growth: 200 },
      { month: "Nov", growth: 210 },
      { month: "Dec", growth: 220 },
    ],
  },
];

export default function MatchedGrowthAreaChart({ selectedYear }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const yearData = generatedYearData.find(
      (data) => data.year === selectedYear
    );
    if (yearData) {
      setChartData(yearData.data);
    }
  }, [selectedYear]);

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
              <stop offset="10%" stopColor="#0095FF" stopOpacity={1} />
              <stop offset="90%" stopColor="#131927" stopOpacity={1} />
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
            stroke="#131927"
            fill="url(#growthGradient)" // Apply the gradient fill
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
