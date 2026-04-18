import { baseApi } from "../baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/packages${location?.search}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["packages"],
    }),

    getPackageById: builder.query({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/packages/${id}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["packages"],
    }),

    addPackage: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/packages/create",
          method: "post",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["packages"],
    }),

    editPackage: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/packages/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["packages"],
    }),
    toggleStatus: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/packages/toggle/${id}`,
          method: "DELETE",          
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["packages"],
    }),

    deletePackage: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/packages/delete/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["packages"],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useAddPackageMutation,
  useEditPackageMutation,
  useToggleStatusMutation,
  useDeletePackageMutation,
} = packageApi;