import { combineReducers } from 'redux'

import Users_readAllEngineer from './users/readAllEngineer'
import Project_readAllProjectEngineer from './project/readAllProjectEngineer'
import Skill_readAllSkillEngineer from './skill/readAllSkillEngineer'

export default combineReducers({
  Users_readAllEngineer,
  Project_readAllProjectEngineer,
  Skill_readAllSkillEngineer
})


