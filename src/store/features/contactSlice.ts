import { ApiResponse } from '../../types/global.type'
import { IContactPayload } from '../../types/contact.type'
import { api } from '../baseApi'

const contactSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<ApiResponse<null>, IContactPayload>({
      query: (payload) => ({
        url: '/support',
        method: 'POST',
        body: {
          ...payload,
          name:payload.fullName
        },
      }),
    }),
  }),
})

export const { useSubmitContactMutation } = contactSlice
