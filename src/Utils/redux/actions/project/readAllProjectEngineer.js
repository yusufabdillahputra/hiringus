import { get } from '../../../axios'

export const readAllProjectEngineer = () => {
  return {
    type: 'READ_ALL_PROJECT_ENGINEER',
    payload: get('/project/engineer')
  }
}