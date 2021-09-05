import connectdb from "../../middleware/mongodb";
// import bcrypt from '../../middleware/bcrypt';
import user from "../../models/UserModel";
import post from "../../models/post";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json("wrong method");

    return;
  }

  try {
    var posts = await post
      .find({})
      .sort({ time: "desc" })
      .limit(10)
      .populate("author", "level isonline status username avatar gender admin");

    // console.log(posts)

    res.status(200).json(posts);
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

export default connectdb(handler);
