import connectDB from '../../middleware/mongodb';
// import bcrypt from '../../middleware/bcrypt';
import User from '../../models/user';
import Post from '../../models/post'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(403).json('Wrong method');

    return;
  }

  try {
    var posts = await Post.find({ $orderby: { time: -1 } }).limit(15).populate('author', 'level isOnline status username avatar gender admin');
  }
  catch(e) {
    res.status(500).json({error: e.message});
  }
  finally {
    res.status(200).json( 
      posts, 
    );
  }

} 

export default connectDB(handler);