import { baseApi } from "../baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatsData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");        
        return {
          url: "/analytics/stats",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["overview"],
    }),
    getUserGrowthData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/analytics/yearly-chart?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["overview"],
    }),
    getEventsGrowthData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/analytics/events/yearly-chart?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["overview"],
    }),
  }),
});

export const {
  useGetStatsDataQuery,
  useGetUserGrowthDataQuery,
  useGetEventsGrowthDataQuery,
  useGetRevenueGrowthDataQuery,
} = overviewApi;
