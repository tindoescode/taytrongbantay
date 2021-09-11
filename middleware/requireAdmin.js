// import connectDB from "../middleware/mongodb";
// import jwt from "jsonwebtoken";
// import readCookie from "../utils/readCookie";

// const requireAdmin = (handler) => 
//   connectDB(handler) => async (req, res) => {
//   var token = readCookie(req.headers.cookie, "ttbt_token");

//   if (!token) res.status(403).json({ message: "Not authorized" });
//   let user = jwt.verify(token, process.env.JWT_SECRET);

//   if (!user) return res.status(403).json({ message: "Not authorized" });

//   const isAdmin = await User.findOne({ _id: user.id, admin: "admin" });

//   if (!isAdmin) throw "Bạn không phải là admin";
//   // res.status(200).json(user);

//   return handler(req, res);
// };

// export default (requireAdmin);
