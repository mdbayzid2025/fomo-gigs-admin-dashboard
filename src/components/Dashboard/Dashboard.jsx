import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import UserGrowthBarChart from "../UI/Chart/UserGrowthBarChart";
import EventsGrowthAreaChart from "../UI/Chart/EventsGrowthAreaChart";

import {
  useGetEventsGrowthDataQuery,
  useGetStatsDataQuery,
  useGetUserGrowthDataQuery,
} from "../../Redux/api/overviewApi";

export default function Dashboard() {
  const [userGrowthByYear, setUserGrowthByYear] = useState(2025);
  const [eventsGrowthByYear, setEventsGrowthByYear] = useState(2025);

  const {
    data: allStatsData,
    isLoading: loadingStatsData,
    isError: statDataError,
  } = useGetStatsDataQuery();
  const statsData = allStatsData?.data;
  // console.log("statsData", statsData);

  const {
    data: allUserGrowthData,
    isLoading: loadingGrowthData,
    isError: growthDataError,
  } = useGetUserGrowthDataQuery(userGrowthByYear);
  const growthData = allUserGrowthData?.data;
  // console.log("growthData", growthData);

  const {
    data: allEventsGrowthData,
    isLoading: loadingEventsData,
    isError: eventsDataError,
  } = useGetEventsGrowthDataQuery(eventsGrowthByYear);
  const eventsData = allEventsGrowthData?.data;
  console.log("eventsData", eventsData);

  const handleUserGrowthYearChange = (event) => {
    setUserGrowthByYear(event.target.value);
  };
  const handleMatchesGrowthYearChange = (event) => {
    setEventsGrowthByYear(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);

  if (loadingStatsData | loadingGrowthData | loadingEventsData) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (statDataError | growthDataError | eventsDataError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="bg-[#fdfdfd] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full h-28">
            <p className="font-medium text-lg">Total User</p>
            <p className="text-3xl font-semibold">{statsData?.users}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Service Providers</p>
            <p className="text-3xl font-semibold">
              {statsData?.serviceProviders}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#131927] text-white rounded-lg px-8 py-4 w-full  h-28">
            <p className="font-medium text-lg">Total Events</p>
            <p className="text-3xl font-semibold"> {statsData?.events}</p>
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
                  <MenuItem value={2029}>2029</MenuItem>
                  <MenuItem value={2028}>2028</MenuItem>
                  <MenuItem value={2027}>2027</MenuItem>
                  <MenuItem value={2026}>2026</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-5">
            <UserGrowthBarChart
              selectedYear={userGrowthByYear}
              growthData={growthData}
            />
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
                    value={eventsGrowthByYear}
                    label="Year"
                    onChange={handleMatchesGrowthYearChange}
                    className="h-10"
                  >
                    <MenuItem value={2029}>2029</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex mt-5 h-full">
              <EventsGrowthAreaChart
                selectedYear={eventsGrowthByYear}
                eventsData={eventsData}
              />
            </div>
          </div>

          {/* service stats */}
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
