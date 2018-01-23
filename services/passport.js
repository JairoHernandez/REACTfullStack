const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// !TIP:  1 arg means we are fetching out of mongoose.
// 2 args means we are loading into mongoose.
// This is our true model Class.
const User = mongoose.model('users'); 

// user it the user we pulled out of mongoDB 2 seconds ago when executing passport.use.
passport.serializeUser((user, done) => {
    // console.log(`SERIALIZEUSER: ${user}`);
    done(null, user.id); // done() is a callback and user.id is the mongoID not profileId from google.
                         // user.id disntigues between a facebook/twitter/google id.
                         // user.id auto reference "_id": { "$oid": <mongoID> }
                         // user.id is stuffed into cookie.
});

passport.deserializeUser((id, done) => { // de-stuffs the cookie to extract user.id
    User.findById(id)
        .then(user => {
            // console.log(`DESERIALIZEUSER: ${user}`);
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // tells our App the user is coming back from Google so let's handle it by calling the callback.
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => { 
    // console.log('\naccessToken:', accessToken); // Not making use of it. Expires after some amount of time.
    // console.log('\nrefreshToken:', refreshToken); // Also, not making use of it.
    // console.log('\nprofile:', profile); // Contains google userid, which is unique identifying token, that we want to save into user records.
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
        // We already have a record with the give profile ID.
        // 1st arg null means there's no error here and everything went fine.
        // 2nd arg says user had already been created.
        // console.log(`EXISTING-USER: ${existingUser}`)
        return done(null, existingUser); // done() is a callback
    } 
    // ONLY creates in the javascript world and not mongoDB DB if you forget save().
    const user = await new User({ googleId: profile.id }).save(); // <-- Creates new model instance and saves it.
    done(null, user);
}));