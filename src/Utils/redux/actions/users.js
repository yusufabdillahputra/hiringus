import { get } from '../../axios'

export const getUsers = () => {
  return {
    type: 'GET_USERS',
    payload: get('/users')
  }
}