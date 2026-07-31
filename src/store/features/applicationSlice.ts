import { ApiResponse } from '../../types/global.type'
import {
  IApplicationForm,
  IApplicationPayload,
} from '../../types/application.type'
import { api } from '../baseApi'

function buildApplicationPayload(form: IApplicationForm): IApplicationPayload {
  const details = [
    form.website && `Website: ${form.website}`,
    form.products && `Products offered: ${form.products}`,
    form.labTesting && `Lab testing / COA available: ${form.labTesting}`,
    form.message && `Additional details: ${form.message}`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    company_name: form.company_name,
    message: details || 'Vendor application submitted.',
  }
}

const applicationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    submitApplication: builder.mutation<
      ApiResponse<IApplicationPayload>,
      IApplicationForm
    >({
      query: (form) => ({
        url: '/application',
        method: 'POST',
        body: buildApplicationPayload(form),
      }),
    }),
  }),
})

export const { useSubmitApplicationMutation } = applicationSlice
