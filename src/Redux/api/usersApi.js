import { baseApi } from "../baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
        return {
          url: "/users",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getServiceProviders: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
        return {
          url: "/analytics/service-providers",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    changeProviderStatus: builder.mutation({
      query: ({ providerId, status }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        // console.log("gsd at", accessToken);
        console.log(providerId);
        return {
          url: `/analytics/service-provider/${providerId}/status`,
          method: "patch",
          body: { status },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetServiceProvidersQuery,
  useChangeProviderStatusMutation,
} = overviewApi;
