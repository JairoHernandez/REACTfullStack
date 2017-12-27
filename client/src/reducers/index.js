import { combineReducers } from 'redux';
import authReducer from './authReducer';

// The keys used here represent keys of our state object so put some thought into their names.
export default combineReducers({
    auth: authReducer
});