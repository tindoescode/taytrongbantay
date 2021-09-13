import mongoose from "mongoose";

var Schema = mongoose.Schema;

var comment = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,

      validate: {
        validator: function (str) {
          return str.length > 20;
        },
        message: () => `Nội dung cần tối thiểu 20 ký tự`,
      },
    },
    time: {
      type: Date,
      default: Date.now,
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
  { collection: "comments" }
);

mongoose.models = {};

var Comment = mongoose.model("Comment", comment);

export default Comment;
