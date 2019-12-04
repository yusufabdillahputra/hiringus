import { get } from '../../../axios'

export const readByIdUsersSkillEngineer = (id_users) => {
  return {
    type: 'READ_USERS_PROJECT_ENGINEER',
    payload: get(`/skill/engineer/users/${id_users}`)
  }
}