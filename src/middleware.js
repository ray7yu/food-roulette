const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET

const withAuth = function(req, res, next) {
    const token = req.cookies.token;
    
    if(!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.send(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}
module.exports = withAuth;