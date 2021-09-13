import Title from "./Title";
import tw, { styled, css } from "twin.macro";
import { useState } from "react";
import useToggle from "../hooks/useToggle";

export default function ChatBox() {
  let [content, setContent] = useState();
  let [chat, toggleChat] = useToggle(false);

  const messages = [
    {
      name: "Huy Can",
      avatar: "https://i.pravatar.cc/300",
      content: "Hello, có ai ở đây ko",
    },
    {
      name: "Xuan Quynh",
      avatar: "https://i.pravatar.cc/300",
      content:
        "Bạn chưa đăng nhập, hãy chọn đăng nhập, hoặc đăng ký để sử dụng hết tính năng của taytrongbantay nhé! 😛 Em chao anh Huy Can",
    },
    {
      name: "Huy Can",
      avatar: "https://i.pravatar.cc/300",
      content: "Chao em Quynh.",
    },
  ];

  return (
    <div
      id="ChatBox"
      tw="fixed bg-white shadow-2xl bottom-0 right-0 w-96 z-50 overflow-y-auto"
      css={[
        css`
          transition: max-height 0.6s ease;
          max-height: 28rem;
        `,
        !chat &&
          css`
            max-height: 2.4rem;
          `,
      ]}
    >
      <Title onClick={toggleChat}>
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
        Chat Box
      </Title>
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            tw="shadow mb-2 flex justify-between gap-2 p-2 divide-x divide-green-500"
          >
            <img
              src={message.avatar}
              alt={`avatar của ${message.name}`}
              tw="w-20 h-20 rounded"
            />
            <div tw="p-2 flex-grow">
              <div tw="mb-2 font-bold">{message.name}</div>
              <div tw="text-lg">{message.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
