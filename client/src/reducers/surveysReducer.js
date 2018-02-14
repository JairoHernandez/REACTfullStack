import { FETCH_SURVEYS } from '../actions/types';

// list of surveys is an array so use empty array for default.
export default function(state =  [], action) {
    switch(action.type){
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}