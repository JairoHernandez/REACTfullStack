// SurveyForm shows a form fora user to add input.
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // This reduxForm helper is what allows communication to Redux store.
import SurveyField from './SurveyField';

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                <Field
                    label="Survey Title" 
                    type="text" 
                    name="title" 
                    component={SurveyField} 
                />
                <Field
                    label="Subject Line" 
                    type="text" 
                    name="subject" 
                    component={SurveyField} 
                />
                <Field
                    label="Email Body" 
                    type="text" 
                    name="body" 
                    component={SurveyField} 
                />
                <Field
                    label="Recipient List" 
                    type="text" 
                    name="emails" 
                    component={SurveyField} 
                />
            </div>
        );
    }

    render() {
        // this.props.handleSubmit() is provided by reduxHelper wired up at bottom.
        // name="surveyTitle" <-- stores key(aka property) called 'surveyTitle' in Redux store
        return (
            <div>   
                <form onSubmit={this.props.handleSubmit(values => console.log('handleSubmit ->', values))}>
                    {/*<Field type="text" name="surveyTitle" component="input" />*/}
                    {this.renderFields()}
                    <button type="Submit">Submit</button>
                </form>
            </div>
        );
    }
}

// reduxForm wires up the same way as 'connect' helper to Redux store.
// Only difference it that it can only take one single argument that contains 
// a couple of different options to make our form behave a cetain way.
// This single argument is called form.
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);