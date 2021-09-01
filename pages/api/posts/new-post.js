import connectDB from '../../../middleware/mongodb';
import bcrypt from '../../../middleware/bcrypt';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      let { password, new_password } = req.body;

      if(!(password && new_password)) throw new Error('Vui lòng điền đủ số trường yêu cầu.');


    }  
    catch(e) {
      res.status(500).json({error: e.message});
    }


  }

  res.status(200).json('ok');
} 

export default connectDB(handler);