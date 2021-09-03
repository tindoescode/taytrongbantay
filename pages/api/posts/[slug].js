import connectDB from '../../../middleware/mongodb';
// import bcrypt from '../../middleware/bcrypt';
import User from '../../../models/UserModel';
import Post from '../../../models/post'
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  var { slug } = req.query;

  if (req.method !== 'GET') {
    res.status(403).json('Wrong method');

    return;
  }

  try {
    var post = await Post.findOne({slug}).populate('author', 'level isOnline status username avatar gender admin');
  }
  catch(e) {
    res.status(200).json({error: e.message});
  }
  finally {
    res.status(200).json( 
      post, 
    );
  }

} 

export default connectDB(handler);