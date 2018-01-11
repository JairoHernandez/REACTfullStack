// 'next' is used when there is more than 1 middleware.
// Middleware#1 in the chain executes 'next' to pass execution on to Middleware#2.
module.exports = (req, res, next) => {
    if (!req.user) { // user does not exist or not logged in by passport.
        return res.status(401).send({ error: 'You must log in!' }); // 401 Forbidden from accessing resource.
    }
    
    next();
};