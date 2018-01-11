const keys = require('../config/keys');
// Get access to key.
const stripe = require('stripe')(keys.stripeSecretKey); // stripeSecretKey is env variable.
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // Reach out to Stripe to finalize the charge.
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
    app.post('/api/stripe', requireLogin, async (req, res) => {

        /** MOVED INTO middlewares/requireLogin.js 
        if (!req.user) { // user does not exist or not logged in by passport.
            return res.status(401).send({ error: 'You must log in!' }); // 401 Forbidden from accessing resource.
        }*/
        
        console.log(Date.now());
        console.log('req.body:', req.body);
        // Confirm the charge on the backend. Different than the authorization initiated by frontend.
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 dollars for 5 credits',
            source: req.body.id
        });

        // console.log('charge:', charge);
        // After successfully applying charge to user's credit card update usermodel  
        // with $5 credit and then send usermodel back to client.
        req.user.credits += 5;
        const user = await req.user.save(); // BEST to have a copy of the usermodel returned back to 
                                            // us since it will always hold its latest copy.
        res.send(user); // Send requested data from usermodel DB to browser.
    });
    
};
