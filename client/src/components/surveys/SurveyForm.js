// SurveyForm shows a form fora user to add input.
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // This reduxForm helper is what allows communication to Redux store.
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [ // list of distinct items.
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject'},
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
    renderFields() {
        // return _.map(FIELDS, field => {
            // return <Field component={SurveyField} type="text" label={field.label} name={field.name} />
        return _.map(FIELDS, ({ label, name }) => { // ES6 destructuring. "Get me the label" and "Get me the name".
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        // this.props.handleSubmit() is provided by reduxHelper wired up at bottom.
        // name="surveyTitle" <-- stores key(aka property) called 'surveyTitle' in Redux store
        return (
            <div>   
                <form onSubmit={this.props.handleSubmit(values => console.log('handleSubmit ->', values))}>
                    {/*<Field type="text" name="surveyTitle" component="input" />*/}
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button type="submit" className="teal bth-flat right white-text">
                        NEXT
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}; // Returned to redux and if it's empty it tells everything is good to go.

    // title coincides with the 'name' property assigned in FIELDS.
    // if (!values.title) {
    //     errors.title = 'You must provide a title';
    // }

    // Place before _.each so that it always prints "You must provide email."
    // since it will be overriden by _.each.
    errors.emails = validateEmails(values.emails || ''); // will tell us what emails are invalid.

    // REFACTOR to fill in additional error fields.
    // Use forEach loop because we are not trying to return a list here just modifying.
    _.each(FIELDS, ({ name }) => { // Pull out just 'name' property.
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

        return errors;
}

// reduxForm wires up the same way as 'connect' helper to Redux store.
// Only difference it that it can only take one single argument that contains 
// a couple of different options to make our form behave a cetain way.
// This single argument is called form.
export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);