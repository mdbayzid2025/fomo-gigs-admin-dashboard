import { baseApi } from "../baseApi";

const interactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/support${location?.search}`,
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
        return {
          url: `/reports${location?.search}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          transformResponse: (response) => {            
            return response?.data;
          },
        };
      },
      providesTags: ["interact"],
    }),
    changeReportStatus: builder.mutation({
      query: ({ providerId, status }) => {
        const accessToken = sessionStorage.getItem("accessToken");

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
    getSystemHealth: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/system-health",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["interact"],
    }),
  }),
});

export const {
  useGetSupportDataQuery,
  useUpdateSupportStatusMutation,
  useGetReportsDataQuery,
  useChangeReportStatusMutation,
  useGetSystemHealthQuery,
} = interactApi;
