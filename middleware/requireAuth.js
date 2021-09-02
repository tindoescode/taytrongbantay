import jwt from 'jsonwebtoken';

function readCookie(cookies, n){
    var c = cookies.split('; '),
        i = c.length - 1,
        C;
  
    for(; i>=0; i--){
       C = c[i].split('=');
       if(C[0] == n) return C[1];
    }
  }
  
  
const requireAuth = handler => (req, res) => {
    var token = readCookie(req.headers.cookie, 'access_token');

    let user = jwt.verify(token, process.env.JWT_SECRET);

    if(!user) return res.status(403).json({error: 'Not authorized'});
    // res.status(200).json(user);
    
    return handler(req, res);
}

export default requireAuth;