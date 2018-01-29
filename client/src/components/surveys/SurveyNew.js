// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
    // Component level state(NOT Redux)
    /*constructor(props) {
        super(props);

        this.state = { new: false };
    }*/
    // create-react-app have a Babel plugin that condenses 
    // constructor() to this and are equivalent.
    state = { showFormReview: false }; // Set to false initially to NOT show form review.

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview 
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }
        return (
            <SurveyForm 
                onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render() {
        return (
            <div>   
                {/*<SurveyForm />*/}
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);