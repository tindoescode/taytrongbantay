import connectDB from '../../../middleware/mongodb';
// import bcrypt from '../../middleware/bcrypt';
// import User from '../../models/user';
import Post from '../../../models/post'
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      var { content, title, tags, slug } = req.body;

      if(!(content && title && tags && slug)) throw "Missing parametter."

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
      res.status(500).json({error: e.message});
    }
    finally {
      res.status(200).json(post);
    }
  }

} 

export default connectDB(handler);