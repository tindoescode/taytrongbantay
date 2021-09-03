import connectDB from '../../middleware/mongodb';
// import bcrypt from '../../middleware/bcrypt';
import User from '../../models/UserModel';
import Post from '../../models/post'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(403).json('Wrong method');

    return;
  }

  try {
    var posts = await Post.find({}).sort({time: 'desc'}).limit(10).populate('author', 'level isOnline status username avatar gender admin');
  
    // console.log(posts)

    res.status(200).json( 
      posts, 
    );
  }
  catch(e) {
    res.status(200).json({error: e.message});
  }
} 

export default connectDB(handler);