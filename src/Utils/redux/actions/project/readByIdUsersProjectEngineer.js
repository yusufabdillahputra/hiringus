import { get } from '../../../axios'

export const readByIdUsersProjectEngineer = (id_users) => {
  return {
    type: 'READ_USERS_PROJECT_ENGINEER',
    payload: get(`/project/engineer/users/${id_users}`)
  }
}