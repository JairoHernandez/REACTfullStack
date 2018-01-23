// SurveyField contains logic to render a single label and text input.

import React from 'react';

// export default (props) => {
// ES6 destructure pulls out input property from object and assigns to variable input.
export default ({ input, label, meta: { error, touched } }) => { // Look into meta object and pull out error and touched properties.
    
    // console.log(props.input);
    console.log('input:', input);
    // console.log('meta:', meta); // Helps tshoot validate() in SurveryForm.js.
    // {...input} equivalent to onBlur={input.onBlur} onChange={input.onChange} etc...
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ maginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};