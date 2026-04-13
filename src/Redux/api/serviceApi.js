import { baseApi } from "../baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: `/service-categories${location?.search ? location?.search : ''}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["services"],
    }),
    getServiceBookings: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/bookings/dashboard/service-provider${location?.search}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          transformResponse: (response) => response?.data,
        };
      },
      providesTags: ["services"],
    }),
    getServiceCategories: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/service-categories${location?.search}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["services"],
    }),
    addCategory: builder.mutation({
      query: (categoryData) => {
        const accessToken = sessionStorage.getItem("accessToken");
                
        return {
          url: "/service-categories",
          method: "post",
          body: categoryData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["services"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/service-categories/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["services"],
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/service-categories/${id}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceBookingsQuery,
  useGetServiceCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} = overviewApi;
