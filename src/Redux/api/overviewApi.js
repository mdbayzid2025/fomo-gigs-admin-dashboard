import { baseApi } from "../baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatsData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
        return {
          url: "/analytics/stats",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getUserGrowthData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log("gugd", accessToken);
        // console.log("selected year", year);
        return {
          url: `/analytics/yearly-chart?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getEventsGrowthData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gugd", accessToken);
        console.log("selected year", year);
        return {
          url: `/analytics/events/yearly-chart?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getRevenueGrowthData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("grgd", accessToken);
        return {
          url: "/commission/chart",
          method: "get",
          headers: {
            authorization: accessToken,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetStatsDataQuery,
  useGetUserGrowthDataQuery,
  useGetEventsGrowthDataQuery,
  useGetRevenueGrowthDataQuery,
} = overviewApi;
