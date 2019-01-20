import { combineReducers } from 'redux';
import auth from './auth';
import pets from './pets';

export default combineReducers({ auth, pets });
