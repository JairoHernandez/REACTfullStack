import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {

    // With help of redux-thunk this allows us to dispatch action 
    // only when axios get promise request has been resolved.
    return function(dispatch) {
        // Only needs relative path, which goes back to long discussion about 
        // how root URL is prepended in both DEV and PROD environment.
        // res is response from express server.
        axios.get('/api/current_user')
            .then(res => dispatch({ type: FETCH_USER, payload: res }));
    }
};