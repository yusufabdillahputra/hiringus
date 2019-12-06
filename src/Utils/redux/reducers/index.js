import { combineReducers } from 'redux'

/**
 * Api
 */
import Users_readAllProjectSkillEngineer from './users/readAllProjectSkillEngineer'
import Users_readById from './users/readById'
import Profile_postPhotoModal from './components/profile/postPhotoModal'
import Landing_postCategory from './components/landing/postCategory'

export default combineReducers({
  Users_readAllProjectSkillEngineer,
  Users_readById,
  Profile_postPhotoModal,
  Landing_postCategory
})
