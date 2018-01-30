// Do this vs. using 'require' out of models/Survey.js because it will be 
// less of a headache if you decide to use a testing framework in the future.
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys'); // Use 'surveys' model created in models/Survey.js

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        res.send({}); // No really necessary, but do this so we wont leave Sendgrid hanging.
    });

    // Create a new survey and save to DB.
    // Are you logged in and do you have at least one credit to send out a survey.
    // REMEMBER THIS IS STILL BACKEND SERVER.
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // First test that you can pull out tiltle, subject, body, recipient form req.body.
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            //recipients: recipients.split(',').map(email => { return { email: email } })
            // REFACTOR: You need wrap curly braces with () to tell JS the curly {} is NOT 
            // definining a function to run but rather an object. Final result is array of ojbects.
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // trim() removes extra whitespace so that only commas are the focus.

            // id property is auto-generated by mongoDB so we dont have to define it in any 
            // Schema! It's just a property available in any mongoose model.
            _user: req.user.id ,
            dateSent: Date.now()
        });

        // Greate place to send an email.
        const mailer = new Mailer(survey, surveyTemplate(survey));

        // If anything goes wrong with any of these await statemets report back the error.
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            // The user on the way to the DB is stale so refresh the user as the one coming back from DB.
            const user = await req.user.save();
            // Send back the update usermodel to show new value of credits.
            // This is what allows us to update our app header.
            res.send(user);
        } catch (err) {
            res.status(422).send(err); // 422 is to let user know our try block had errors.
        }
    });
};