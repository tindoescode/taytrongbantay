import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel"; // use when populate user
import Post from "../../../models/post";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "PUT") {
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
      var {
        old_slug,
        content,
        title,
        tags,
        slug,
        thumbnail,
        description,
        category,
      } = req.body;

      if (!(content && title && tags && slug && description))
        throw "Xin hãy nhập đủ các trường.";

      const update = {
        content,
        title,
        tags,
        slug,
        thumbnail,
        description,
        category,
        lastEdited: {
          by: user.id,
          lastEdited: Date.now(),
        },
      };

      var post = await Post.findOneAndUpdate({ slug: old_slug }, update, {
        new: true,
      });

      if (!post) throw { message: "Update fail" };
      console.log(`[POST] Post ${title} editted.`, post);
    } catch (e) {
      var error = e;
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(post);
    }
  } else res.status(200).json({ error: "wrong_method" });
}

export default handler;
