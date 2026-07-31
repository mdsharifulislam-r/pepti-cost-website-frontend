import { getFromLocalStorage } from "../../lib/utils";
import { ApiResponse } from "../../types/global.type";
import { api } from "../baseApi";


const token = getFromLocalStorage("accessToken")
const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/verify-email",
                    body: data,
                }
            }
        }),

        login: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            },
        }),

        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/forget-password",
                    body: data
                }
            }
        }),

        resetPassword: builder.mutation({
            query: (value) => {

                return {
                    url: "/auth/reset-password",
                    headers: { authorization: value.token ?? undefined },
                    method: "POST",
                    body: value
                }
            }
        }),

        changePassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/change-password",
                    body: data,
                }
            }
        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    method: "PATCH",
                    url: "/user/profile",
                    body: data,
                }
            },
            invalidatesTags: ["Profile"],
        }),

        profile: builder.query<ApiResponse<any>, any>({
            query: () => {

                return {
                    url: "/user/profile",
                    method: "GET",
                    headers: { authorization: `Bearer ${token}` },
                }
            },
            providesTags: ["Profile"],
        }),
    })
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
} = authSlice;