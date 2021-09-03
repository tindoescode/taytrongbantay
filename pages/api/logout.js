import jwt from 'jsonwebtoken';
import readCookie from '../../utils/readCookie';
import User from '../../models/UserModel';
import { setCookie } from '../../utils/cookies';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      var token = readCookie(req.headers.cookie, 'access_token');

      if(!token) throw "Vui lòng đăng nhập trước.";

      var { username } = jwt.verify(token, process.env.JWT_SECRET);

      if(!username) throw "Invalid cookie";
      
      setCookie(res, 'access_token', '', {
        maxAge: -1,
        path: '/api',
      });

      res.status(200).redirect('/');
    }
    catch(e) {
      res.status(200).json(e);
    }
  }
  else {
    res.status(200).json('not support');
  }
} 

export default handler;