import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String, 
    default: 'https://i.stack.imgur.com/l60Hf.png'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
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
    type: String,
    enum: ['admin', 'user', 'mod'],
    default: 'user'
  },
  level: {
    type: Number,
    default: 1
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Vào tường mình rồi thì kết bạn đi chứ' 
  }
},
  { collection: 'users' }
);

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;
