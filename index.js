const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Give access to cookies.
const passport = require('passport'); // Makes use of cookies.
const keys = require('./config/keys');
const bodyParser = require('body-parser');

// model HAS TO GO BEFORE passport otherwise you wil get this error due to order of operations.
// "MissingSchemaError: Schema hasn't been registered for model "users"."
require('./models/User');
require('./models/Survey');
require('./services/passport'); // Equivalent to pasting all code here.

// DEV db
mongoose.Promise = global.Promise; // Removes error: (node:6679) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// console.log(`COOKIEKEY: ${keys.cookieKey}`);
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        // signs/encrypts cookie but put it in config.js file. Array around key(s) is important.
        keys: [keys.cookieKey] // because it's an array you add more keys to increase security because app will randomly select one for use.
    })
);
app.use(passport.initialize());
app.use(passport.session());

/**route handler */
require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Order of operations matter here.

    // Express will serve up production assets 
    // like our main.js file or main.css file.
    app.use(express.static('client/build')); // If any GET request comes in looking for /client/build/static/js/main.js 
                                             // then just look in 'client/build' since it lives in that request path.

    // Express will serve up the index.html file if it doesnt recognize the route. 
    // This is catch-all if there's no match for 'client/build'.
    const path = require('path')   ;
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);