import connectdb from "../../../middleware/mongodb";
import Post from "../../../models/post";
import Category from "../../../models/category";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json("wrong_method");

    return;
  }

  let { limit = 10, category } = req.query;

  let searchString = {};

  if (category) {
    var { _id: catId } = await Category.findOne(
      { slug: category },
      "_id"
    ).lean();

    searchString.category = catId;
  }

  try {
    var posts = await Post.find(
      searchString,
      "title author thumbnail description slug parent category"
    )
      .sort({ time: "desc" })
      .limit(limit)
      .populate([
        // {
        //   path: "author",
        //   select: "level isonline username name avatar gender admin",
        // },
        {
          path: "category",
        },
      ]);

    res.status(200).json(posts);
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

export default connectdb(handler);
