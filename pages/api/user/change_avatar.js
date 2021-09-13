import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel"; // use when populate user
import Category from "../../../models/CategoryModel";
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

      // Check for fields
      var { avatarUrl } = req.body;

      if (!avatarUrl) throw "missing_parameter";

      const update = {
        avatar: avatarUrl,
      };

      var cat = await User.findByIdAndUpdate(user.id, update, {
        new: true,
      });

      if (!cat) throw { message: "Update fail" };
      console.log(`[USER] User ${user.username} changed profile picture.`, cat);
    } catch (e) {
      var error = e;
      res.status(200).json({ success: false, error: e });
    } finally {
      if (!error) res.status(200).json({ success: true });
    }
  } else res.status(200).json({ error: "wrong_method" });
};

export default connectDB(handler);
