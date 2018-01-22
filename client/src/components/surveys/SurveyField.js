// SurveyField contains logic to render a single label and text input.

import React from 'react';

// export default (props) => {
// ES6 destructure pulls out input property from object and assigns to variable input.
export default ({ input, label }) => { 
    
    // console.log(props.input);
    console.log('input:', input);
    // {...input} equivalent to onBlur={input.onBlur} onChange={input.onChange} etc...
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};