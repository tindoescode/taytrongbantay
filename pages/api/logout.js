import jwt from 'jsonwebtoken';
import readCookie from '../../utils/readCookie';
import nookies from 'nookies'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      var token = readCookie(req.headers.cookie, 'ttbt_token');

      if(!token) throw "Vui lòng đăng nhập trước.";

      var { username } = jwt.verify(token, process.env.JWT_SECRET);

      if(!username) throw "Invalid cookie";
      
      nookies.set(null, 'ttbt_token', '', {
        maxAge: -1,
        path: '/',
      })
    }
    catch(e) {
      console.log(e);
    }
    res.status(200).redirect('/');
  }
  else {
    res.status(200).json('not support');
  }
} 

export default handler;