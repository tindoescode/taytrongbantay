import connectDB from '../../../middleware/mongodb';
// import bcrypt from '../../middleware/bcrypt';
// import User from '../../models/user';
import requireAuth from '../../../middleware/requireAuth';
import Post from '../../../models/post'
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      var { content, title, tags, slug } = req.body;

      if(!(content && title && tags && slug)) throw "Xin hãy nhập đủ các trường."

      const token = req.headers['authorization'].slice(7); // remove Bearer
      const user = jwt.verify(token, process.env.JWT_SECRET);

      var post = await Post.create({
        content,
        title,
        tags,
        author: user.id,
        slug
      })

      console.log(`[POST] Post ${title} created.`, post);
    }
    catch(e) {
      var error = e;
      res.status(200).json({error: e});
    }
    finally {
      if(!error) res.status(200).json(post);
    }
  }

} 

export default requireAuth(connectDB(handler));