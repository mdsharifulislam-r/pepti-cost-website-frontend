import { ApiResponse } from "../../types/global.type";
import { IVendorItem } from "../../types/peptides.type";
import { IVendorList } from "../../types/vendorlist.type";
import { api } from "../baseApi";

const vendorSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getVendors: builder.query<ApiResponse<IVendorList[]>, { page?: number, limit?: number }>({
            query: (params) => ({
                method: "GET",
                url: "/vendor/vendor-list",
                params
            }),
        }),
        getVendorItems: builder.query<ApiResponse<IVendorItem[]>, { peptide?: string, page?: number, limit?: number, searchTerm?: string }>({
            query: (params) => ({
                method: "GET",
                url: "/vendor",
                params
            }),
        }),

        getLowestItems: builder.query<ApiResponse<IVendorItem[]>, void>({
            query: () => ({
                method: "GET",
                url: "/vendor/lowest-peptides",
            }),
        }),

        getBiggestSavings: builder.query<ApiResponse<IVendorItem[]>, void>({
            query: () => ({
                method: "GET",
                url: "/vendor/biggest-savings",
            }),
        }),

        getTopRatedVendors: builder.query<ApiResponse<IVendorList[]>, void>({
            query: () => ({
                method: "GET",
                url: "/vendor/top-rated-vendors",
            }),
        }),

    }),
});

export const {
    useGetVendorsQuery,
    useGetVendorItemsQuery,
    useGetLowestItemsQuery,
    useGetBiggestSavingsQuery,
    useGetTopRatedVendorsQuery
} = vendorSlice;