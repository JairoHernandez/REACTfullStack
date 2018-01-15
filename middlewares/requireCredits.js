// 'next' is used when there is more than 1 middleware.
// Middleware#1 in the chain executes 'next' to pass execution on to Middleware#2.
module.exports = (req, res, next) => {
    if (req.user.credits < 1) { // No credits then kick user out.
        return res.status(403).send({ error: 'Not enough credits!' }); // 403 Forbidden.
    }
    
    next();
};