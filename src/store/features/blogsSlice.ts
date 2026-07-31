import { ApiResponse } from "../../types/global.type";
import { IBlog } from "../../types/blog.type";
import { api } from "../baseApi";

const blogSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<ApiResponse<IBlog[]>, {
            page?: number;
            limit?: number;
            search?: string;
            category?: string;
        }>({
            query: ({ page = 1, limit = 10, search, category }) => ({
                url: "/blog",
                params: { page, limit, search, category },
            }),
        }),
        getBlogById: builder.query<ApiResponse<IBlog>, { id: string }>({
            query: ({ id }) => `/blog/${id}`,
        })
    })
})


export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,

} = blogSlice;


