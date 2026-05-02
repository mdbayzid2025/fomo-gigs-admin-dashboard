import { baseApi } from "../baseApi";

const withdrawalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWithdrawals: builder.query({
            query: () => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/withdrawals/admin/all${location?.search || ""}`,
                    method: "get",
                    headers: { authorization: `Bearer ${accessToken}` },
                };
            },
            providesTags: ["withdrawals"],
        }),

        getWithdrawalDetails: builder.query({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/withdrawals/details/${id}`,
                    method: "get",
                    headers: { authorization: `Bearer ${accessToken}` },
                };
            },
            providesTags: ["withdrawals"],
        }),

        markProcessing: builder.mutation({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/withdrawals/admin/${id}/mark-processing`,
                    method: "patch",
                    headers: { authorization: `Bearer ${accessToken}` },
                };
            },
            invalidatesTags: ["withdrawals"],
        }),

        approveWithdrawal: builder.mutation({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/withdrawals/admin/${id}/approve`,
                    method: "patch",
                    headers: { authorization: `Bearer ${accessToken}` },
                };
            },
            invalidatesTags: ["withdrawals"],
        }),

        rejectWithdrawal: builder.mutation({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/withdrawals/admin/${id}/reject`,
                    method: "patch",
                    headers: { authorization: `Bearer ${accessToken}` },
                };
            },
            invalidatesTags: ["withdrawals"],
        }),
    }),
});

// ✅ Export hooks directly from withdrawalApi (not baseApi)
export const {
    useGetAllWithdrawalsQuery,
    useGetWithdrawalDetailsQuery,
    useMarkProcessingMutation,
    useApproveWithdrawalMutation,
    useRejectWithdrawalMutation,
} = withdrawalApi;