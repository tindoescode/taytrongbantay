import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../../models/MessageModel";
import mongoose from "mongoose";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("chat message", (msg, token) => {
        let user = jwt.verify(token, process.env.JWT_SECRET);

        if (!user) return; // TODO: Tell user that he is not authorized

        Message.create({
          author: mongoose.Types.ObjectId(user.id),
          content: msg,
        })
          .then((message) => message.populate("author", "avatar"))
          .then((message) => {
            console.log(
              `[Message] User ${user.username} has just sent a meesage.`,
              message
            );
            io.emit("chat message", msg, user.username, message.author.avatar);
          })
          .catch((error) => {
            console.log("[message error]", error);
          });
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
