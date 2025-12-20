import { baseApi } from "../baseApi";

const interactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/support",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["interact"],
    }),
    getReportsData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/reports",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["interact"],
    }),
    changeReportStatus: builder.mutation({
      query: ({ providerId, status }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log("gsd at", accessToken);
        console.log(providerId);
        return {
          url: `/reports/${providerId}/status`,
          method: "patch",
          body: { status },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["interact"],
    }),
  }),
});

export const {
  useGetSupportDataQuery,
  useGetReportsDataQuery,
  useChangeReportStatusMutation,
} = interactApi;
