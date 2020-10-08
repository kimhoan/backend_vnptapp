const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //send token to auth header
    const token = req.header('auth-token')
    if (!token) {
        //truy cập bị từ chối.
        return res.status(401).send({ err: 'Access Denied' })
    }
    try {
        // check verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //hợp lệ thì thực hiện next()
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ err: 'Access Denied' })
    }
}
module.exports = verifyToken 