
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getFromLocalStorage } from '../lib/utils'

export const API_BASE_URL = 'http://10.10.26.164:5003'
const token = getFromLocalStorage('accessToken')

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Profile'],
})

export const imageUrl = `${API_BASE_URL}/files`
