import Image from "next/image";
import tw, { css } from "twin.macro";
import Editor from "../CKEditor";
import Button from "../Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Markup } from "interweave";
import FacebookLoading from "../FacebookLoading";

const CommentForm = ({ id }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(null);
  const user = useSelector((state) => state.user);

  const fetchData = async () => {
    axios
      .get("/api/comment/get_comment", { params: { post_id: id } })
      .then((res) => {
        setComments(res.data.comments);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/comment/add_comment", { parentPost: id, content })
      .then((res) => {
        console.log(res.data);
        const { success } = res.data;

        if (success) {
          toast.success("Bình luận đã gửi");
          fetchData();
        } else {
          let { message } =
            res.data.error.errors[Object.keys(res.data.error.errors)[0]];
          console.log(message);
          toast.error(message);
        }
      });
  };

  const deleteComment = (commentId) => (e) => {
    e.preventDefault();

    axios
      .delete("/api/comment/delete_comment", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { comment_id: commentId },
      })
      .then((res) => {
        const { data } = res;

        if (data.success) {
          toast.success("Xóa bình luận thành công");

          fetchData();
        } else {
          toast.error("Xóa bình luận thất bại");
        }
      });
  };
  return (
    <>
      {user && (
        <div
          tw="flex py-3 px-1 justify-center"
          css={[
            css`
              max-width: 72rem;
            `,
          ]}
        >
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
              src={`${user.avatar || "https://placekitten.com/300/300"}`}
              layout="fill"
              objectFit="cover"
              // tw={`rounded`}
              alt="avatar"
            />
          </div>

          <div
            css={[
              tw`bg-white relative z-0 bg-opacity-70 before:(bg-yellow-500 bg-opacity-50)`,
              tw`ml-3 flex-grow`,
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
            <Button onClick={onSubmit} tw="mt-2 px-10">
              Gửi
            </Button>
          </div>
        </div>
      )}

      {!user && <p tw="text-center p-2">Hãy đăng nhập để bình luận.</p>}
      <div>
        {comments &&
          comments.map((cmt, index) => {
            return (
              <div key={index} tw="flex p-1 mx-1 gap-2">
                <div>
                  <div
                    css={[
                      css`
                        background: url(${cmt.author.avatar}) no-repeat center /
                          cover;
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
                  <div tw="flex justify-between items-center">
                    <a href="">
                      <b tw="font-mono">{cmt.author.username}</b> -{" "}
                      {cmt.author.admin}
                    </a>
                    {user?.admin && (
                      <div>
                        <Button
                          onClick={deleteComment(cmt._id)}
                          type="sm"
                          error
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </div>
                  <p tw="text-justify">
                    <Markup content={cmt.content} />
                  </p>
                </div>
              </div>
            );
          })}
        {!comments && (
          <p tw="flex items-center justify-center text-lg">
            Loading... <FacebookLoading />
          </p>
        )}
        {!comments?.length && <p tw="text-center mb-5">Không có comment nào</p>}
      </div>
    </>
  );
};

export default CommentForm;
