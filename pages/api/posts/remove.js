import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel"; // use when populate user
import Post from "../../../models/PostModel";
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
      var { slug } = req.body;

      if (!slug) throw "Xin hãy nhập đủ các trường.";

      var post = await Post.findOneAndDelete({ slug });

      if (!post) throw { message: "Delete fail" };
      console.log(`[POST] Post ${title} delete.`, post);
    } catch (e) {
      var error = e;
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(post);
    }
  } else res.status(200).json({ error: "wrong_method" });
};

export default connectDB(handler);
