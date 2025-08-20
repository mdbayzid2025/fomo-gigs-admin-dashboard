import { useState } from "react";
import { LuCalendar } from "react-icons/lu";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import UserStatisticsBarChart from "../Chart/UserStatisticsBarChart";
import MatchedGrowthAreaChart from "../Chart/MatchedGrowthAreaChart";
import JourneyStats from "../UI/JourneyStats";

export default function Dashboard() {
  const [userGrowthByYear, setUserGrowthByYear] = useState(2025);
  const [userGrowthByMonth, setUserGrowthByMonth] = useState("All");
  const [matchesGrowthByYear, setMatchesGrowthByYear] = useState(2025);
  const [matchesGrowthByMonth, setMatchesGrowthByMonth] = useState("All");
  const [journeyStatByYear, setJourneyStatByYear] = useState(2025);
  const [journeyStatByMonth, setJourneyStatByMonth] = useState("All");

  const handleUserGrowthYearChange = (event) => {
    setUserGrowthByYear(event.target.value);
  };
  const handleUserGrowthMonthChange = (event) => {
    setUserGrowthByMonth(event.target.value);
  };
  const handleMatchesGrowthYearChange = (event) => {
    setMatchesGrowthByYear(event.target.value);
  };
  const handleMatchesGrowthMonthChange = (event) => {
    setMatchesGrowthByMonth(event.target.value);
  };
  const handleJourneyStatYearChange = (event) => {
    setJourneyStatByYear(event.target.value);
  };
  const handleJourneyStatMonthChange = (event) => {
    setJourneyStatByMonth(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);

  return (
    <div className="bg-[#fdfdfd] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-[#CD8085] text-white rounded-lg px-8 py-4 w-full h-28">
            <p className="font-medium text-lg">Total User</p>
            <p className="text-3xl font-semibold">150</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#CD8085] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Total Matches</p>
            <p className="text-3xl font-semibold">50</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#CD8085] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Total Diagnosis</p>
            <p className="text-3xl font-semibold">12</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#CD8085] text-white rounded-lg px-8 py-4 w-full h-28">
            <p className="font-medium text-lg">Total Therapy</p>
            <p className="text-3xl font-semibold">10</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="bg-[#fdf9f7] shadow-xl w-full px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-[#333333] font-semibold text-xl">
                Total Growth of User
              </p>
            </div>
            <div className="flex items-center gap-3 w-64">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  <div className="flex items-center">
                    <p>
                      <LuCalendar fontSize={20} />
                    </p>
                    {/* <p className="text-sm">Year</p> */}
                  </div>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userGrowthByYear}
                  label="Year"
                  onChange={handleUserGrowthYearChange}
                  className="h-10"
                >
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  <div className="flex items-center">
                    <p>
                      <LuCalendar fontSize={20} />
                    </p>
                    {/* <p className="text-sm">Year</p> */}
                  </div>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userGrowthByMonth}
                  label="Month"
                  onChange={handleUserGrowthMonthChange}
                  className="h-10"
                >
                  {[
                    "All",
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <MenuItem key={index} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-5">
            <UserStatisticsBarChart
              selectedYear={userGrowthByYear}
              selectedMonth={userGrowthByMonth}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          {/* revenue */}
          <div
            className="bg-[#FDF9F7] shadow-xl flex-3 px-3 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#333333] font-semibold text-xl">
                Matches Growth
              </p>
              <div className="flex items-center gap-3 w-56">
                <FormControl fullWidth>
                  <InputLabel id="revenue-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="revenue-year-label"
                    id="revenue-year-select"
                    value={matchesGrowthByYear}
                    label="Year"
                    onChange={handleMatchesGrowthYearChange}
                    className="h-10"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="revenue-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={matchesGrowthByMonth}
                    label="Month"
                    onChange={handleMatchesGrowthMonthChange}
                    className="h-10"
                  >
                    {[
                      "All",
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <MenuItem key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex mt-5 h-full">
              <MatchedGrowthAreaChart
                selectedYear={matchesGrowthByYear}
                selectedMonth={matchesGrowthByMonth}
              />
            </div>
          </div>

          {/* service stats */}
          <div
            className="bg-[#FDF9F7] shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1A1A1A] font-semibold text-xl">
                  Journey Stats
                </p>
              </div>
              <div className="flex items-center gap-2 w-56">
                <FormControl fullWidth>
                  <InputLabel id="service-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="service-year-label"
                    id="service-year-select"
                    value={journeyStatByYear}
                    label="Year"
                    onChange={handleJourneyStatYearChange}
                    className="h-10"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="service-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={matchesGrowthByMonth}
                    label="Month"
                    onChange={handleJourneyStatMonthChange}
                    className="h-10"
                  >
                    {[
                      "All",
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <MenuItem key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <JourneyStats
              selectedYear={journeyStatByYear}
              selectedMonth={journeyStatByMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
