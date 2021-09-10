import connectDB from "../../../middleware/mongodb";
// import User from '../../models/user'; // use when populate user
import requireAuth from "../../../middleware/requireAuth";
import Post from "../../../models/post";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      var { id, content, title, tags, slug, thumbnail, description, category } =
        req.body;

      if (!(content && title && tags && slug && description))
        throw "Xin hãy nhập đủ các trường.";

      var token = readCookie(req.headers.cookie, "ttbt_token");

      const user = jwt.verify(token, process.env.JWT_SECRET);

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
          lastEdited: Date.now,
        },
      };

      var post = await Post.findByIdAndUpdate(id, update, { new: true });

      console.log(`[POST] Post ${title} editted.`, post);
    } catch (e) {
      var error = e;
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(post);
    }
  }
};

export default requireAdmin(handler);
