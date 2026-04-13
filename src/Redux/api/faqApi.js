import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/faq",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["faq"],
    }),
    createFAQ: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");        
        return {
          url: "/faq",
          method: "post",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");        
        return {
          url: `/faq/${payload.id}`,
          method: "patch",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: `/faq/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetFaqDataQuery,
  useCreateFAQMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
