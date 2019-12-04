import { get } from '../../../axios'

export const readAllEngineer = () => {
  return {
    type: 'READ_ALL_ENGINEER',
    payload: get('/users/engineer')
  }
}