import jwt from 'jsonwebtoken';
import readCookie from '../utils/readCookie'
  
const requireAuth = handler => (req, res) => {
    var token = readCookie(req.headers.cookie, 'access_token');

    let user = jwt.verify(token, process.env.JWT_SECRET);

    if(!user) return res.status(403).json({error: 'Not authorized'});
    // res.status(200).json(user);
    
    return handler(req, res);
}

export default requireAuth;