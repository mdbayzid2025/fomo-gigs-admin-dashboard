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

const generatedYearData = [
  {
    year: 2023,
    data: [
      { month: "January", users: 400 },
      { month: "February", users: 600 },
      { month: "March", users: 300 },
      { month: "April", users: 450 },
      { month: "May", users: 700 },
      { month: "June", users: 750 },
      { month: "July", users: 350 },
      { month: "August", users: 900 },
      { month: "September", users: 500 },
      { month: "October", users: 650 },
      { month: "November", users: 800 },
      { month: "December", users: 200 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "January", users: 450 },
      { month: "February", users: 650 },
      { month: "March", users: 400 },
      { month: "April", users: 500 },
      { month: "May", users: 720 },
      { month: "June", users: 780 },
      { month: "July", users: 600 },
      { month: "August", users: 850 },
      { month: "September", users: 700 },
      { month: "October", users: 900 },
      { month: "November", users: 950 },
      { month: "December", users: 1000 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "January", users: 500 },
      { month: "February", users: 700 },
      { month: "March", users: 800 },
      { month: "April", users: 850 },
      { month: "May", users: 950 },
      { month: "June", users: 1000 },
      { month: "July", users: 700 },
      { month: "August", users: 1100 },
      { month: "September", users: 900 },
      { month: "October", users: 1000 },
      { month: "November", users: 1050 },
      { month: "December", users: 1150 },
    ],
  },
];

export default function UserStatisticsBarChart({
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

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="1 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#CD8085" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
