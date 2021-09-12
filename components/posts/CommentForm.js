import React from "react";
import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import Editor from "../CKEditor";
import Button from "../Button";
import { useState } from "react";

const CommentForm = () => {
  const [content, setContent] = useState("");

  const comments = [
    {
      avatar:
        "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7",
      name: "yasuo",
      content: "Death is like the wind, always by my side",
    },
    {
      avatar:
        "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7",
      name: "yasuo",
      content: "Death is like the wind, always by my side",
    },
    {
      avatar:
        "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7",
      name: "yasuo",
      content: "Death is like the wind, always by my side",
    },
    {
      avatar:
        "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7",
      name: "yasuo",
      content: "Death is like the wind, always by my side",
    },
    {
      avatar:
        "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7",
      name: "yasuo",
      content: "Death is like the wind, always by my side",
    },
  ];

  return (
    <>
      <div tw="flex -ml-4 py-3 w-screen max-w-6xl justify-center">
        <div
          css={[
            css`
              & img {
                ${tw`shadow-2xl`}
                border-radius: 10px;
              }
            `,
          ]}
          tw="relative w-12 h-12 md:w-28 md:h-28"
        >
          <Image
            src="https://placekitten.com/300/300"
            layout="fill"
            objectFit="cover"
            // tw={`rounded`}
            alt="avatar"
          />
        </div>

        <div
          css={[
            tw`bg-white relative z-0 bg-opacity-70 before:(bg-yellow-500 bg-opacity-50)`,
            tw`ml-4 flex-grow`,
            css`
              max-width: 80%;
            `,

            css`
              &:before {
                content: "";
                position: absolute;
                border: 1px rgb(152 220 169);
                width: 10px;
                height: 10px;
                top: 1.4rem;
                left: -10px;
                /* clip-path: polygon(100% 0, 100% 100%, 0 50%); */
                clip-path: polygon(
                  36% 33%,
                  65% 22%,
                  83% 13%,
                  100% 0,
                  100% 100%,
                  0 33%
                );
              }

              & {
                --ck-color-toolbar-border: #fcd34d;
                --ck-color-base-border: #fcd34d;
              }
            `,
          ]}
        >
          <Editor setContent={setContent} />
          <Button tw="mt-2 px-10">Gửi</Button>
        </div>
      </div>

      <div>
        {comments &&
          comments.map((cmt, index) => {
            return (
              <div key={index} tw="flex p-1 mx-1 gap-2">
                <div tw="relative">
                  <div
                    css={[
                      css`
                        background: url(${cmt.avatar}) no-repeat center / cover;
                      `,
                      tw`w-20 h-20 rounded-2xl`,
                    ]}
                  ></div>
                </div>
                <div
                  css={[
                    tw`flex-grow text-lg border border-yellow-300 p-2 rounded`,
                    tw`bg-white bg-opacity-20`,
                  ]}
                >
                  <a href="">
                    <strong>{cmt.name}</strong> - Admin
                  </a>
                  <p tw="text-justify">{cmt.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CommentForm;
