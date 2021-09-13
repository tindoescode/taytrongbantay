import connectdb from "../../../middleware/mongodb";
import Comment from "../../../models/CommentModel";
import User from "../../../models/UserModel";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json("wrong_method");

    return;
  }

  let { limit = 10, post_id } = req.query;
  try {
    if (!post_id) {
      throw { message: "missing_parameter" };
    }

    let searchString = { parentPost: post_id };
    var comments = await Comment.find(
      searchString
      // "title author thumbnail description slug parent category"
    )
      .sort({ time: "desc" })
      .limit(limit)
      .populate([
        {
          path: "author",
          select: "isonline username name avatar gender admin",
        },
      ]);

    res.status(200).json({ success: true, comments });
  } catch (e) {
    res.status(200).json({ success: false, error: e.message });
  }
};

export default connectdb(handler);
