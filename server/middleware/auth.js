const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const header = req.headers['authorization'] || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // {id,role}-available to every protected route
        next();
    }catch(err){
        console.error('Token verification error:', err);
        return res.status(401).json({ message: 'Invalid/expired token' });
    }
}

module.exports = verifyToken;