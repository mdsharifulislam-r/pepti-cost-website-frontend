import { ApiResponse } from "../../types/global.type";
import { IPeptideItem, IPeptideList } from "../../types/peptides.type";
import { api } from "../baseApi";

const peptideSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPeptides: builder.query<ApiResponse<IPeptideList[]>, void>({
            query: () => ({
                method: "GET",
                url: "/peptides",
            }),
        }),

        getPeptideItemDetails: builder.query<ApiResponse<IPeptideItem[]>, void>({
            query: () => ({
                method: "GET",
                url: "/vendor/peptides-details",
            }),
        })
    }),
});

export const {
    useGetPeptidesQuery,
    useGetPeptideItemDetailsQuery
} = peptideSlice;