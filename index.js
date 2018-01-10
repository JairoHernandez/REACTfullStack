const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Give access to cookies.
const passport = require('passport'); // Makes use of cookies.
const keys = require('./config/keys');
const bodyParser = require('body-parser');

// model HAS TO GO BEFORE passport otherwise you wil get this error due to order of operations.
// "MissingSchemaError: Schema hasn't been registered for model "users"."
require('./models/User'); 
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

require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);