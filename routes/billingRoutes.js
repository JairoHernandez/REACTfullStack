const keys = require('../config/keys');
// Get access to key.
const stripe = require('stripe')(keys.stripeSecretKey); // stripeSecretKey is env variable.

module.exports = app => {
    // React out to Stripe to finalize the charge.
    // Then update the user's number of credits.
    /*app.post('/api/stripe', (req, res) => {

        console.log('req.body:', req.body);
        // Confirm the charge on the backend. Different than the authorization initiated by frontend.
        stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 dollars for 5 credits',
            source: req.body.id
        });
    });*/

    // REFACTOR with async
    // 1. Place async in front of function containing asynchronous logic.
    // 2. Place await in front of callback stripe.charges.create().
    // 3. Once it's resolved pass it to const charge.
    app.post('/api/stripe', async (req, res) => {

        console.log('req.body:', req.body);
        // Confirm the charge on the backend. Different than the authorization initiated by frontend.
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 dollars for 5 credits',
            source: req.body.id
        });

        console.log('charge:', charge);
    });
    
};
