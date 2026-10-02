import { api } from "../baseApi";

export interface LibraryItem {
  _id: string;
  headline: string;
  content: string;
  thumbnail?: string;
  pdf?: string;
  category: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const librarySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getLibraryItems: builder.query<LibraryItem[], void>({
      query: () => ({
        method: "GET",
        url: "/peptideInfo",
      }),
      transformResponse: (
        response: LibraryItem[] | { data?: LibraryItem[]; items?: LibraryItem[] } | undefined,
      ) => {
        if (Array.isArray(response)) return response;

        if (response && typeof response === "object") {
          if (Array.isArray((response as { data?: LibraryItem[] }).data)) {
            return (response as { data: LibraryItem[] }).data;
          }

          if (Array.isArray((response as { items?: LibraryItem[] }).items)) {
            return (response as { items: LibraryItem[] }).items;
          }
        }

        return [];
      },
    }),
    getLibraryItemById: builder.query<LibraryItem, string>({
      query: (id) => ({
        method: "GET",
        url: `/peptideInfo/${id}`,
      }),
      transformResponse: (
        response:
          | LibraryItem
          | { data?: LibraryItem; item?: LibraryItem; result?: LibraryItem }
          | undefined,
      ) => {
        if (response && typeof response === "object") {
          if ("_id" in response) return response as LibraryItem;
          if ((response as { data?: LibraryItem }).data) return (response as { data: LibraryItem }).data;
          if ((response as { item?: LibraryItem }).item) return (response as { item: LibraryItem }).item;
          if ((response as { result?: LibraryItem }).result) return (response as { result: LibraryItem }).result;
        }

        return response as LibraryItem;
      },
    }),
  }),
});

export const { useGetLibraryItemsQuery, useGetLibraryItemByIdQuery } = librarySlice;
