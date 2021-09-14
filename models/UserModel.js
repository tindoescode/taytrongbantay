import mongoose from "mongoose";
var Schema = mongoose.Schema;

var user = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function usernameIsValid(username) {
          return /^[0-9a-zA-Z_.-]+$/.test(username);
        },
        message: (props) => `${props.value} có chứa ký tự không hợp lệ`,
      },
    },
    avatar: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
      validate: {
        validator: function isURL(str) {
          var urlRegex =
            "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
          var url = new RegExp(urlRegex, "i");
          return str.length < 2083 && url.test(str);
        },
        message: (props) => `Avatar không phải là link`,
      },
    },
    cover: {
      type: String,
      default:
        "https://github.com/tindoescode/taytrongbantay/raw/master/images/ttbt_cover.jpg",
      validate: {
        validator: function isURL(str) {
          var urlRegex =
            "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
          var url = new RegExp(urlRegex, "i");
          return str.length < 2083 && url.test(str);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", null],
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: function validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    since: {
      type: Date,
      default: Date.now,
    },
    admin: {
      type: String,
      enum: ["admin", "user", "mod"],
      default: "user",
    },
    level: {
      type: Number,
      default: 1,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Vào tường mình rồi thì kết bạn đi chứ😄",
    },
    reputation: {
      type: Number,
      default: 0,
    },
    facebookId: {
      type: Number,
      default: 0,
    },
  },
  { collection: "users" }
);

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;
