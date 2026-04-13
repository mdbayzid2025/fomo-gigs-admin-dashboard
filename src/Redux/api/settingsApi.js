import { baseApi } from "../baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");        
        return {
          url: "/auth/change-password",
          method: "post",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getAboutUs: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/rules/about",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addAboutUs: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/rules/about",
          method: "post",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getTermsAndConditions: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/rules/terms-and-conditions",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addTermsAndConditions: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/rules/terms-and-conditions",
          method: "post",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/rules/privacy-policy",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addPrivacyPolicy: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        return {
          url: "/rules/privacy-policy",
          method: "post",
          body: payload,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetAboutUsQuery,
  useAddAboutUsMutation,
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
} = settingsApi;
