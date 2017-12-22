const passport = require('passport');

module.exports = app => {

    // app.get watches for incoming requests.
    // req is Object representing incoming request. res Object represents outgiong response.
    // passport's  GoogleStrategy has an internal identifier called 'google' that it knows about.
    app.get('/auth/google', passport.authenticate('google', { 
            // An options argument that tells google server to give us access to specific pieces of a user's google account.
            // Like their profile, email, google docs, etc.. Google has an internal list for these.
            // Not really using them for our app but wanted to show that they're there.
            scope: ['profile', 'email'] 
        })
    ); 

    /** passport automatically attaches 'user' property to 'req' object hence req.user.
     * passport also attaches other functions to request object as well like logout() 
     * hence request.logout().
    */

    app.get('/auth/google/callback', passport.authenticate('google'));
    
    app.get('/api/logout', (req, res) => {
        req.logout(); // Kills user's id in cookie basically makes it to where you no longer are that user.
        res.send(`Logging out: ${req.user}`); // Send to user proof they are no longer signed in.
    });
    
    app.get('/api/current_user', (req, res) => {
        console.log(`req.user: ${req.user}`);
        res.send(req.user);
    });
};

