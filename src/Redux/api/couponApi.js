import { baseApi } from "../baseApi";

const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCoupons: builder.query({
            query: () => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: "/coupons",
                    method: "get",
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ["coupons"],
        }),

        getCouponById: builder.query({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/coupons/${id}`,
                    method: "get",
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ["coupons"],
        }),

        addCoupon: builder.mutation({
            query: (couponData) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: "/coupons",
                    method: "post",
                    body: couponData,
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ["coupons"],
        }),

        editCoupon: builder.mutation({
            query: ({ id, data }) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/coupons/${id}`,
                    method: "put",
                    body: data,
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ["coupons"],
        }),

        deleteCoupon: builder.mutation({
            query: (id) => {
                const accessToken = sessionStorage.getItem("accessToken");
                return {
                    url: `/coupons/${id}`,
                    method: "delete",
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ["coupons"],
        }),
    }),
});

export const {
    useGetCouponsQuery,
    useGetCouponByIdQuery,
    useAddCouponMutation,
    useEditCouponMutation,
    useDeleteCouponMutation,
} = couponApi;