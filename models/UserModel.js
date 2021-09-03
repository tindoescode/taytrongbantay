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
    required: function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
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
  },
  reputation: {
    type: Number,
    default: 0,
  }
},
  { collection: 'users' }
);

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;
