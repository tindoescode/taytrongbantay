import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Number,
    default: 0
  }
},
  { collection: 'users' }
);

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;
