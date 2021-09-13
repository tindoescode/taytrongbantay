import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel"; // use when populate user
import Comment from "../../../models/CommentModel";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      // Admin check
      var token = readCookie(req.headers.cookie, "ttbt_token");

      if (!token) res.status(403).json({ message: "Not authorized" });
      let user = jwt.verify(token, process.env.JWT_SECRET);

      if (!user) return res.status(403).json({ message: "Not authorized" });

      const isAdmin = await User.findOne({
        // username: user.username,
        _id: user.id,
        admin: "admin",
      });

      if (!isAdmin) throw { message: "Bạn không phải là admin" };

      // Check for fields
      var { comment_id } = req.body;

      if (!comment_id) throw "missing_parameter";

      // TODO: limit comment that a user can delete
      //or limit 'admin' account.
      var comment = await Comment.findByIdAndDelete(comment_id);

      if (!comment) throw { message: "Delete fail" };

      console.log(`[COMMENT] Comment deleted.`, comment);
    } catch (e) {
      var error = e;
      res.status(200).json({ success: false, error: e });
    } finally {
      if (!error) res.status(200).json({ success: true, ...comment });
    }
  } else res.status(200).json({ error: "wrong_method" });
};

export default connectDB(handler);
