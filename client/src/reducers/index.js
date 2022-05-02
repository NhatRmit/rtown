import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import profile from './profile'
import community from './community'
import comment from './comment'
import image from './image'

export default combineReducers({
  auth,
  post,
  profile,
  community,
  comment,
  image
});