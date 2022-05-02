import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import profile from './profile'
import community from './community'
import comment from './comment'
import item from './item'
import messenger from './messenger'

export default combineReducers({
  auth,
  post,
  profile,
  community,
  comment,
  item,
  messenger,
});