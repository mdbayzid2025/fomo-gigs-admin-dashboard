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

export default function UserGrowthBarChart({ selectedYear, growthData }) {
  const [chartData, setChartData] = useState([]);
  // console.log(chartData);

  // console.log("selectedYear", selectedYear);
  // console.log("growthData", growthData);

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

  useEffect(() => {
    if (growthData && Array.isArray(growthData.chart)) {
      if (growthData.year == selectedYear) {
        setChartData(growthData.chart);
      }
    } else {
      setChartData([]);
    }
  }, [growthData, selectedYear]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-[250px] flex items-center justify-center text-gray-500">
        No data available for {selectedYear}
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="1 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(month) => monthNames[month - 1]}
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="user" fill="#131927" barSize={20} />
          <Bar dataKey="serviceProvider" fill="#0095FF" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
