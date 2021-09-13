import Title from "./Title";
import tw, { styled, css } from "twin.macro";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import io from "socket.io-client";
import TextArea from "./TextArea";
import Button from "./Button";
import Form from "./Form";
import axios from "axios";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";

export default function ChatBox() {
  let [chat, toggleChat] = useToggle(false);
  let [message, setMessage] = useState([]);
  let user = useSelector((state) => state.user);

  const addMessage = (newMessage) =>
    setMessage((state) => [newMessage, ...state]);

  useEffect(() => {
    const socket = io();
    axios.get("/api/socketio").finally(() => {
      socket.on("chat message", function (content, username, avatar) {
        addMessage({
          avatar,
          name: username,
          content,
        });
      });
    });

    axios.get("/api/message/get_message").then(({ data }) => {
      if (data.success) {
        setMessage(
          data.messages.map((message) => {
            return {
              avatar: message.author.avatar,
              content: message.content,
              name: message.author.username,
            };
          })
        );
      }
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  const onSubmit = ({ content }) => {
    axios.get("/api/socketio").finally(() => {
      const socket = io();
      const cookies = parseCookies();

      socket.emit("chat message", content, cookies.ttbt_token);
    });
  };
  // TODO: phan trang chatbox
  return (
    <div
      id="ChatBox"
      tw="md:mx-4 fixed bg-white shadow-2xl bottom-0 right-0 z-50 overflow-y-auto"
      css={[
        css`
          transition: max-height 0.6s ease;
          max-height: 28rem;
          max-width: 90%;
          width: 21rem;
        `,
        !chat &&
          css`
            max-height: 2.4rem;
            overflow: hidden;
          `,
        tw`md:w-6/12`,
      ]}
    >
      <Title onClick={toggleChat}>
        {(chat && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tw="inline h-5 w-5 hover:scale-150 transition"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )) || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tw="inline h-5 w-5 hover:scale-150 transition"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
        Chat Box
      </Title>
      {user && (
        <Form tw="flex flex-col" onSubmit={onSubmit}>
          <TextArea name="content" tw="p-2 m-4"></TextArea>
          <Button tw="mx-12">Gửi</Button>
        </Form>
      )}
      {message &&
        message.map((msg, index) => {
          return (
            <div
              key={index}
              tw="shadow mb-2 flex justify-between gap-2 p-2 divide-x divide-green-500"
            >
              <img
                src={msg.avatar}
                alt={`avatar của ${msg.name}`}
                tw="w-20 h-20 rounded"
              />
              <div tw="p-2 flex-grow">
                <div tw="mb-2 font-bold">{msg.name}</div>
                <div tw="text-lg">{msg.content}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
