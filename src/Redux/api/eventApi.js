import { baseApi } from "../baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("events at", accessToken);
        return {
          url: "/analytics/events",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
  }),
});

export const { useGetAllEventsQuery } = eventApi;
