const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(401).json({
                error: 'no authorization headers'
            });
        }
        const token = authorization.split(' ')[1];

        const user = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: 'HS512'
        });
        req.user = user;
        next();
        console.log(token)
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
module.exports = authenticate