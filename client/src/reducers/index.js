// This file is where we wire up reducers. Not just the ones we want
// but also 3rd party ones like redux-form.
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';

// The keys used here represent keys of our state object so put some thought into their names.
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});