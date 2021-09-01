import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var post = new Schema({
  author_id: {
    type: String,
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
    unique: true,
  },
  tag: {
    type: String,
    required: true
  },
  
},
  { collection: 'posts' }
);

mongoose.models = {};

var Post = mongoose.model('Post', post);

export default Post;
