import { get } from '../../../axios'
import JWT from 'jsonwebtoken'

const jwt = localStorage.getItem('jwt')
const decode = JWT.decode(jwt, {complete: true})
const idUsers = decode.payload.id_users

export const readById = () => {
  return {
    type: 'READ_BY_ID_USERS',
    payload: get(`/users/id/${idUsers}`)
  }
}