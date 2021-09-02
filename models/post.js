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
    required: function() {
      return this.slug.length > 20;
    },    
  },
  content: {
    type: String,
    required: function() {
      return this.slug.length > 50;
    },
  },
  tags: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    default: null
  },
  slug: {
    type: String,
    required: function() {
      return this.slug.length > 10;
    },
    unique: true
  },
  thumbnail: {
    type: String,
    default: '/images/no-thumbnail-medium.png'
  }
  
},
  { collection: 'posts' }
);

mongoose.models = {};

var Post = mongoose.model('Post', post);

export default Post;
