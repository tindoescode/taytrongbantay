import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel"; // use when populate user
import Category from "../../../models/category";
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
      var { id, description, name, slug } = req.body;

      if (!(id && slug && name)) throw "Xin hãy nhập đủ các trường.";

      const update = {
        id,
        description,
        name,
        slug,
        lastEdited: {
          by: user.id,
          lastEdited: Date.now(),
        },
      };

      var cat = await Category.findByIdAndUpdate(id, update, {
        new: true,
      });

      if (!cat) throw { message: "Update fail" };
      console.log(`[CATEGORY] Category ${title} editted.`, post);
    } catch (e) {
      var error = e;
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(cat);
    }
  } else res.status(200).json({ error: "wrong_method" });
};

export default connectDB(handler);
