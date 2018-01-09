const keys = require('../config/keys');
// Get access to key.
const stripe = require('stripe')(keys.stripeSecretKey); // stripeSecretKey is env variable.

module.exports = app => {
    // React out to Stripe to finalize the charge.
    // Then update the user's number of credits.
    app.post('/api/stripe', (req, res) => {

        // Take credit card and bill it.
    });
};
