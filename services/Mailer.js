const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        // DO IT THIS WAY BECAUSE THIS IS WHAT sendgrid is telling us to do.
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // This functions is already part of helper.Mail as its searched up the super() chain.
        this.addContent(this.body);
        // Enable click tracking inside of our email.
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // sendgrid documentation tells you to write this code, but doesnt really explain it.
    // Only choice we have is to do what they say so no way to really expalin what's goin on here.
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        // function already part of Mail base class.
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() // Another property defined by Mail base class.
        });

        // const response = await this.sgApi.API(request);
        // return response;
        // Refactor for better error reporting.
        const response = await this.sgApi.API(request, (error, response) => {
            if (error) {
                console.log("Error response received");
            }
                console.log('RESPONSE STATUSCODE:', response.statusCode);
                console.log('RESPONSE BODY:', response.body);
                console.log('RESPONSE HEADERS:', response.headers);
        });
        return response;
    }
}

module.exports = Mailer;