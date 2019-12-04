import { get } from '../../../axios'

export const readAllSkillEngineer = () => {
  return {
    type: 'READ_ALL_SKILL_ENGINEER',
    payload: get('/skill/engineer')
  }
}