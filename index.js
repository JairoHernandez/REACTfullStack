const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // tells our App the user is coming back from Google so let's handle it.
}, (accessToken, refreshToken, profile, done) => { 
    console.log('\naccessToken:', accessToken);
    console.log('\nrefreshToken:', refreshToken);
    console.log('\nprofile:', profile);
}));

// app.get watches for incoming requests.
// req is Object representing incoming request. res Object represents outgiong response.
// passport's  GoogleStrategy has an internal identifier called 'google' that it knows about.
app.get('/auth/google', passport.authenticate('google', { 
        // tells google server to give us access to user's profile and their email. Google has an internal list for these.
        // Not really using them for our app but wanted to show that they're there.
        scope: ['profile', 'email'] 
    })
); 


app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);