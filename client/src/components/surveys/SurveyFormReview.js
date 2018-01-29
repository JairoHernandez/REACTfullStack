// SurveyFormReview shows users their form inputs for review.
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

// Last thing to do is pass in props formValues coming from function mapStateToProps and 
// props submitSurvey from actions. All these come from connect().
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { // ES6 destructure
    // console.log('onCancel --',onCancel);

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            {/* submitSurvey function comes from import as * actions. Also, you need to setup 
            as arrow function so that the function is not executed the moment the page loads.*/}
            <button 
                onClick={() => submitSurvey(formValues, history)} 
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) { // state is from Redux store = {auth: Object, form: Object}
    // return some value that will be added to props for component SurveyFormReview
    console.log(state); // state.form.surveyForm.values
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));