import { get } from '../../../axios'

export const readAllProjectSkillEngineer = () => {
  return {
    type: 'READ_MERGE_ALL_ENGINEER',
    payload: get('/users/merge/engineer')
  }
}