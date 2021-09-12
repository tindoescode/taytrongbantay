import connectDB from "../../../middleware/mongodb";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";
import User from "../../../models/UserModel";

const handler = async (req, res) => {
  try {
    var token = readCookie(req.headers.cookie, "ttbt_token");

    if (!token) throw "Vui lòng đăng nhập trước.";

    var { username } = jwt.verify(token, process.env.JWT_SECRET);

    if (!username) throw "invalid_request";

    const user = await User.findOne({
      username: username.toLowerCase(),
    }).lean();

    delete user.password;

    const result = { isLoggedIn: true, ...user };

    res.json(result);
  } catch (e) {
    res.json({ isLoggedIn: false, reason: e });
  }
};

export default connectDB(handler);
