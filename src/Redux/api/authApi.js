import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: build.mutation({
      query: (otpData) => {
        console.log(otpData);
        return {
          url: "/auth/verify-email",
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: ["user"],
    }),
    updatePassword: build.mutation({
      query: (passwordData) => {
        const resettoken = localStorage.getItem("verifiedOtpToken");
        console.log("Reset Password data:", passwordData);
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: passwordData,
          headers: {
            Authorization: resettoken,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useUpdatePasswordMutation,
} = authApi;
