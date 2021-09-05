import connectDB from "../../../middleware/mongodb";
import mongoose from "mongoose";
// import bcrypt from '../../middleware/bcrypt';
// import User from '../../models/user';
import requireAuth from "../../../middleware/requireAuth";
import Category from "../../../models/category";
import User from "../../../models/UserModel";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      var { name, parent, description, slug } = req.body;
      console.log(name, parent, description, slug);

      if (!name) throw "Xin hãy nhập đủ các trường.";

      var token = readCookie(req.headers.cookie, "ttbt_token");

      const currentUser = jwt.verify(token, process.env.JWT_SECRET);
      let userData = await User.findOne({ username: currentUser.username });

      if (userData.admin != "admin") throw { error: "Bạn không phải là admin" };

      var cat = await Category.create({
        name,
        parent: parent || null,
        description: description || "",
        slug: slug || "",
      });

      console.log(`[CATEGORY] Cat ${name} created.`, cat);
    } catch (e) {
      var error = e;
      console.log(e);
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(cat);
    }
  }
};

export default requireAuth(connectDB(handler));
