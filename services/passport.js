const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // tells our App the user is coming back from Google so let's handle it.
}, (accessToken, refreshToken, profile, done) => { 
    console.log('\naccessToken:', accessToken); // Not making use of it. Expires after some amount of time.
    console.log('\nrefreshToken:', refreshToken); // Also, not making use of it.
    console.log('\nprofile:', profile);
}));