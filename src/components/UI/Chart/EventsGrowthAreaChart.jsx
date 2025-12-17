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

export default function EventsGrowthAreaChart({ selectedYear, eventsData }) {
  const [chartData, setChartData] = useState([]);

  console.log(chartData);

  console.log("selectedYear", selectedYear);
  console.log("eventsData", eventsData);

  useEffect(() => {
    if (eventsData && Array.isArray(eventsData.chart)) {
      if (eventsData.year == selectedYear) {
        setChartData(eventsData.chart);
      }
    } else {
      setChartData([]);
    }
  }, [eventsData, selectedYear]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-[250px] flex items-center justify-center text-gray-500">
        No data available for {selectedYear}
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
            dataKey="eventCount"
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
