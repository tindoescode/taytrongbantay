import connectDB from "../../../middleware/mongodb";
import requireAuth from "../../../middleware/requireAuth";
import Comment from "../../../models/CommentModel";
import mongoose from "mongoose";
import User from "../../../models/UserModel";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      var { content, parentPost } = req.body;

      if (!(content && parentPost)) throw "Xin hãy nhập đủ các trường.";

      var token = readCookie(req.headers.cookie, "ttbt_token");
      const currentUser = jwt.verify(token, process.env.JWT_SECRET);

      var cmt = await Comment.create({
        author: mongoose.Types.ObjectId(currentUser.id),
        content,
        parentPost: mongoose.Types.ObjectId(parentPost),
      });

      console.log(`[Comment] User ${currentUser.name} has just commented.`);
    } catch (e) {
      var error = e;
      console.log("comment_create_error", e);
      res.status(200).json({ success: false, error: e });
    } finally {
      if (!error) res.status(200).json({ success: true, ...cmt });
    }
  }
};

export default requireAuth(connectDB(handler));
