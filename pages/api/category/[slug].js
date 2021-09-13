import connectdb from "../../../middleware/mongodb";
import Category from "../../../models/CategoryModel";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json("wrong method");

    return;
  }

  let { slug } = req.query;
  let searchString = Object.create(null);

  if (slug) {
    searchString.slug = slug;
  }

  try {
    var categories = await Category.find(searchString)
      .sort({ time: "asc" })
      .populate("parent");

    res.status(200).json(categories);
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

export default connectdb(handler);
