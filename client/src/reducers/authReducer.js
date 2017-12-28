export default function(state={}, action) { // Remember state is an object.
    
    // Test if express API is sending back logged in user. 
    // You will 4 executions of it just for booting up app.
    // The first 3 are part of the redux bootup process. 
    // We see the dispatched action in the 4th one.
    // In chrome if you expand the 4th one paylod you will the axios response object.
    // payload.data will show you the goodId, __v, and _id keys/values.
    // Hit https:/localhost:300/api/logout in chrome to logout, payload.data now equals empty string "".
    // To log back in 
    console.log('ACTION:', action); 
    switch (action.type) {
        default:
            return state;
    }
}