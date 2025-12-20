import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
        return {
          url: "/support",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["support"],
    }),
  }),
});

export const { useGetSupportDataQuery } = supportApi;
