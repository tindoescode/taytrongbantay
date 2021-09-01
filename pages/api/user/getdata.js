import connectDB from '../../../middleware/mongodb';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const token = req.headers['authorization'].slice(7); // remove Bearer
      var user = jwt.verify(token, process.env.JWT_SECRET);

      res.status(200).json(user);
    }
    catch(e) {
      res.status(500).json({error: e.message});
    }
  }
  res.status(200).json('not support');
} 

export default connectDB(handler);