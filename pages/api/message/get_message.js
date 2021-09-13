import connectdb from "../../../middleware/mongodb";
import Message from "../../../models/MessageModel";
import User from "../../../models/UserModel";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json("wrong_method");

    return;
  }

  let { limit = 10, post_id } = req.query;
  try {
    var messages = await Message.find(
      {}
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

    res.status(200).json({ success: true, messages });
  } catch (e) {
    res.status(200).json({ success: false, error: e.message });
  }
};

export default connectdb(handler);
