import { api } from "../baseApi";
import { IFaq } from "../../types/faq.type";
import { ApiResponse } from "../../types/global.type";

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getFaqs: builder.query<ApiResponse<IFaq[]>, void>({
            query: () => ({
                url: "/faq",
                method: "GET",
            }),
        }),

        getDisclaimer: builder.query<ApiResponse<{ content: string }>, { type: string }>({
            query: (params) => ({
                url: "/disclaimer",
                method: "GET",
                params
            }),
        })
    }),
});

export const { useGetFaqsQuery, useGetDisclaimerQuery } = faqSlice;