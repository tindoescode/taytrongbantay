import connectDB from '../../../middleware/mongodb';
import jwt from 'jsonwebtoken';
import readCookie from '../../../utils/readCookie';
import User from '../../../models/UserModel';


const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      var token = readCookie(req.headers.cookie, 'access_token');

      if(!token) throw "Vui lòng đăng nhập trước.";

      var { username } = jwt.verify(token, process.env.JWT_SECRET);

      if(!username) throw "Invalid cookie";
      
      const user = await User.findOne({ username: username.toLowerCase() }).lean();

      delete user.password;

      res.status(200).json({user: user});
    }
    catch(e) {
      res.status(200).json({ error: e });
    }
  }
  else {
    res.status(200).json('not support');
  }
} 

export default connectDB(handler);