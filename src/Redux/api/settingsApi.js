import { baseApi } from "../baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
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
      query: ({ data }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("gsd at", accessToken);
        return {
          url: "/users",
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

export const {} = settingsApi;
