import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EventsGrowthBarChart({ selectedYear, eventsData }) {
  const [chartData, setChartData] = useState([]);

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

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className="w-full"
      aria-label={`Bar chart showing event growth for the year ${selectedYear}`}
      role="img"
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3" />

          <XAxis
            dataKey="month"
            tickFormatter={(month) => monthNames[month - 1]}
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

          <Bar
            dataKey="eventCount"
            fill="#131927"
            barSize={25}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
