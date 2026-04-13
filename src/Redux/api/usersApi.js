import { baseApi } from "../baseApi";



const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/users${location?.search ? location?.search : '?page=1&limit=10'}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/users/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["users"],
    }),

    getServiceProviders: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: `/analytics/service-providers${location?.search ? location?.search : ''}`,
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
    getProfile: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/users/profile",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    editProfile: builder.mutation({
      query: (formData) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/users",
          method: "patch",
          body: formData,
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
  useGetProfileQuery,
  useEditProfileMutation,
  useDeleteUserMutation,
} = overviewApi;
