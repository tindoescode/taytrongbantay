import mongoose from "mongoose";

var Schema = mongoose.Schema;

var post = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: function () {
        return this.slug.length > 20;
      },
    },
    content: {
      type: String,
      required: function () {
        return this.slug.length > 50;
      },
    },
    tags: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    slug: {
      type: String,
      required: function () {
        return this.slug.length > 10;
      },
      unique: true,
    },
    thumbnail: {
      type: String,
      default: "/images/no-thumbnail-medium.png",
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
    description: {
      type: String,
      default: "",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    lastEdited: {
      by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      lastEdited: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { collection: "posts" }
);

mongoose.models = {};

var Post = mongoose.model("Post", post);

export default Post;
