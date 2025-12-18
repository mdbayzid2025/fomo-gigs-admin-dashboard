import { baseApi } from "../baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
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
        console.log(accessToken);
        return {
          url: "/rules/about",
          method: "get",
          headers: {
            Authorization: accessToken,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addAboutUs: builder.mutation({
      query: ({ text }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log("aboutUs", text);
        return {
          url: "/rules/about",
          method: "post",
          body: { text },
          headers: {
            Authorization: accessToken,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getTermsAndConditions: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/rules/terms-and-conditions",
          method: "get",
          headers: {
            Authorization: accessToken,
          },
        };
      },
      providesTags: ["settings"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ text }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log("TermsAndConditions", text);
        return {
          url: "/rules/terms-and-conditions",
          method: "post",
          body: { text },
          headers: {
            Authorization: accessToken,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/rules/privacy-policy",
          method: "get",
          headers: {
            Authorization: accessToken,
          },
        };
      },
      providesTags: ["settings"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ text }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        console.log("PrivacyPolicy", text);
        return {
          url: "/rules/privacy-policy",
          method: "post",
          body: { text },
          headers: {
            Authorization: accessToken,
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
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = settingsApi;
