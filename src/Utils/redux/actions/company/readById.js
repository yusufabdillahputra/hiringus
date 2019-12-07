import { get } from '../../../axios'

export const readById = (id_company) => {
  return {
    type: 'READ_ID_COMPANY',
    payload: get(`/company/${id_company}`)
  }
}
