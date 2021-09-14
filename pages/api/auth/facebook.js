// Register with facebook

import connectDB from "../../../middleware/mongodb";
import User from "../../../models/UserModel";
import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { getRndInteger } from "../../../utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let { token } = req.body;

    if (!token) {
      res.status(403).json("Unauthorized");
      return;
    }

    var result = await axios.get(
      `https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cemail%2Cgender&access_token=${token}`
    );

    let { gender, name, id, email } = result.data;

    if (id.length < 5) throw "Unauthorized";

    const existUser = await User.findOne({ facebookId: id }).lean();
    console.log(existUser);

    // Login
    if (existUser) {
      // Chuyển sang đăng nhập
      const ttbt_token = jwt.sign(
        { id: existUser._id, username: existUser.username },
        process.env.JWT_SECRET
      );

      setCookie({ res }, "ttbt_token", ttbt_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      console.log(`[LOGIN] Người dùng ${existUser.username} đã đăng nhập`);

      var result = { status: "ok", ttbt_token, user: existUser };

      delete result.user.password;

      res.status(200).json(result);

      return;
    }

    //  Register
    let username =
      name.replace(" ", "").toLowerCase() + getRndInteger(100, 999).toString();

    console.log(username, name, email);
    if (username && name && email) {
      try {
        // Create new user
        var user = await User.create({
          name,
          username: username.toLowerCase(),
          email,
          avatar: `https://graph.facebook.com/${id}/picture?width=400&height=400`,
          facebookId: id,
          password: "0",
          gender: null,
          // avatar:
          //   gender == "male"
          //     ? "https://i.imgur.com/b51E0eg.jpg"
          //     : "https://i.imgur.com/StTiSj8.jpg",
        });

        const ttbt_token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET
        );

        setCookie({ res }, "ttbt_token", ttbt_token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        console.log(`[NEW USER] User ${name} đã được tạo (with facebook).`);

        let rs = { status: "ok", ttbt_token, user };

        delete rs.user.password;

        return res.status(200).json(rs);
      } catch (error) {
        // Handle error when field duplicate

        console.log(error.message);
        return res.status(200).send(error);
      }
    } else {
      res.status(422).send({ error: "data_incomplete" });
    }
  } else {
    res.status(422).send({ error: "req_method_not_supported" });
  }
};

export default connectDB(handler);
