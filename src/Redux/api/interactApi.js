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
    updateSupportStatus: builder.mutation({
      query: ({ id, status }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log(id, status);
        return {
          url: `/support/${id}/status`,
          method: "PATCH",
          body: { status },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["SupportEmail"],
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
  useUpdateSupportStatusMutation,
  useGetReportsDataQuery,
  useChangeReportStatusMutation,
} = interactApi;
