import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var post = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date().now
  },

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    default: null
  }
  
},
  { collection: 'posts' }
);

mongoose.models = {};

var Post = mongoose.model('Post', post);

export default Post;
