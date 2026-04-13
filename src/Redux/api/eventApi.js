import { baseApi } from "../baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/analytics/events${location?.search ? location?.search : '?page=1&limit=10'}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
    getEventCategories: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");        
        return {
          url: `/event-categories${location?.search}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
    getEventsSalesRevenue: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/events/dashboard/event-ticket-sales-stats",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
    addCategory: builder.mutation({
      query: (categoryData) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/event-categories",
          method: "post",
          body: categoryData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/event-categories/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/event-categories/${id}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventCategoriesQuery,
  useGetEventsSalesRevenueQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} = eventApi;
