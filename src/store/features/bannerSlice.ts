import { ApiResponse } from '../../types/global.type'
import { IBanner } from '../../types/banner.type'
import { api } from '../baseApi'

const bannerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<ApiResponse<IBanner[]>, void>({
      query: () => '/banner',
    }),
  }),
})

export const { useGetBannersQuery } = bannerSlice
