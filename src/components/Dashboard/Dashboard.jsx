import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import UserStatisticsBarChart from "../UI/Chart/UserStatisticsBarChart";
import MatchedGrowthAreaChart from "../UI/Chart/MatchedGrowthAreaChart";
import SubscriptionPieChart from "../UI/Chart/SubscriptionPieChart";

export default function Dashboard() {
  const [userGrowthByYear, setUserGrowthByYear] = useState(2025);
  const [matchesGrowthByYear, setMatchesGrowthByYear] = useState(2025);
  const [journeyStatByYear, setJourneyStatByYear] = useState(2025);

  const handleUserGrowthYearChange = (event) => {
    setUserGrowthByYear(event.target.value);
  };
  const handleMatchesGrowthYearChange = (event) => {
    setMatchesGrowthByYear(event.target.value);
  };

  const handleJourneyStatYearChange = (event) => {
    setJourneyStatByYear(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);

  return (
    <div className="bg-[#fdfdfd] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full h-28">
            <p className="font-medium text-lg">Total User</p>
            <p className="text-3xl font-semibold">150</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Total Order</p>
            <p className="text-3xl font-semibold">50</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Total Events</p>
            <p className="text-3xl font-semibold">12</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="bg-[#fdf9f7] shadow-xl w-full px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GoGraph />
              <p className="text-[#333333] font-semibold text-xl">
                User Growth
              </p>
            </div>
            <div className="flex items-center gap-3 w-28">
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
            </div>
          </div>
          <div className="mt-5">
            <UserStatisticsBarChart selectedYear={userGrowthByYear} />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          {/* revenue */}
          <div
            className="bg-[#FDF9F7] shadow-xl flex-2 px-5 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GoGraph />
                <p className="text-[#333333] font-semibold text-xl">
                  Events Growth
                </p>
              </div>
              <div className="flex items-center gap-3 w-24">
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
              </div>
            </div>
            <div className="flex mt-5 h-full">
              <MatchedGrowthAreaChart selectedYear={matchesGrowthByYear} />
            </div>
          </div>

          {/* service stats */}
          <div
            className="bg-[#FDF9F7] shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 330 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GoGraph />
                <p className="text-[#1A1A1A] font-semibold text-lg">
                  Subscription Distribution
                </p>
              </div>
              <div className="flex items-center gap-2 w-24">
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
              </div>
            </div>
            <div className="flex items-center justify-center h-full">
              <SubscriptionPieChart selectedYear={journeyStatByYear} />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-[#FF6384]" />
                  <p>Basic</p>
                </div>
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-[#36A2EB]" />
                  <p>Enterprise</p>
                </div>
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-[#FFCE56]" />
                  <p>Elevate</p>
                </div>
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-[#FF9F40]" />
                  <p>Momentum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
