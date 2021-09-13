import connectDB from "../../../middleware/mongodb";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";
import User from "../../../models/UserModel";

const handler = async (req, res) => {
  try {
    var token = readCookie(req.headers.cookie, "ttbt_token");

    if (!token) throw "Vui lòng đăng nhập trước.";
    var { username: currentUser } = jwt.verify(token, process.env.JWT_SECRET);
    if (!currentUser) throw "invalid_request";

    let { username } = req.body;

    if (!username) throw "missing_parameter";

    const user = await User.findOne(
      {
        username,
      },
      "status avatar cover username name"
    );

    const result = { isFound: true, ...user._doc };

    res.json(result);
  } catch (e) {
    res.json({ isFound: false, reason: e });
  }
};

export default connectDB(handler);
