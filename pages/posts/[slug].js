import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Markup } from "interweave";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CommentForm from "../../components/posts/CommentForm";
import FacebookLoading from "../../components/FacebookLoading";
import { useState } from "react";
import tw, { css } from "twin.macro";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const NewPostForm = dynamic(
  () => {
    return import("../../components/NewPostForm");
  },
  { ssr: false }
);

export default function SinglePost({
  data: {
    title,
    content,
    author,
    tags,
    slug,
    thumbnail,
    description,
    category,
  },
}) {
  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const toggleRemoveModal = () => {
    setRemoveModal(!removeModal);
  };
  const onPostSubmit =
    ({
      old_slug,
      content,
      title,
      tags,
      slug,
      thumbnail,
      description,
      category,
    }) =>
    (e) => {
      e.preventDefault();

      let tags = "none";

      axios
        .put("/api/posts/edit", {
          old_slug,
          content,
          title,
          tags,
          slug,
          thumbnail,
          description,
          category,
        })
        .then((res) => {
          if (!res.data.error?.message) {
            toast("Bài viết đã được sửa🤗");

            toggleModal();
            router.push(`/posts/${slug}`);
          } else {
            toast(`Lỗi: ${res.data.error.message}`);
          }
        });
    };

  const removePost = () => {
    axios
      .delete("/api/posts/remove", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          slug,
        },
      })
      .then((res) => {
        if (!res.data.error?.message) {
          toast.success("Bài viết đã được xóa");

          router.push("/");
        } else {
          toast.error(`Lỗi: ${res.data.error.message}`);
        }
      });
  };
  if (!title)
    return (
      <p tw="flex items-center justify-center text-lg">
        Loading... <FacebookLoading />
      </p>
    );
  return (
    <div>
      <Head>
        <title>{title} - Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main
        css={[
          css`
            animation: fadeIn 2s ease;
          `,
        ]}
      >
        {editModal && (
          <Modal
            noSubmitButton={true}
            onCancel={{ f: toggleEditModal, text: "Đóng" }}
            title="Chỉnh sửa bài viết"
          >
            <NewPostForm
              onPostSubmit={onPostSubmit}
              initialState={{
                content,
                title,
                tags, // tag is unused now
                slug,
                thumbnail,
                description,
                category,
              }}
            ></NewPostForm>
          </Modal>
        )}

        {removeModal && (
          <Modal
            title="Xóa bài viết"
            onCancel={{ f: toggleRemoveModal, text: "Đóng" }}
            onProcess={{ f: removePost, text: "Xóa" }}
          >
            <p>
              Bạn có chắc muốn xóa bài viết, bạn không thể hoàn tác tác vụ này.
            </p>
          </Modal>
        )}
        <div tw="p-2 bg-green-100 text-center text-xl">{title}</div>
        <div className="ck-content" tw="mb-4 shadow-md p-2 pb-5 leading-7">
          <div tw="md:grid grid-cols-6 gap-4">
            <div tw="flex md:flex-col divide-y-reverse md:divide-y-2 divide-yellow-500">
              <img
                tw="w-20 md:w-60 rounded shadow-xl"
                alt={"Ảnh của " + author.username}
                src={author.avatar}
              />

              <h3 tw="flex-grow md:flex-grow-0 flex items-center flex-col justify-center text-center text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
                <img
                  tw="inline-block"
                  width="30"
                  src="/images/level/50.png"
                  alt="level 50"
                ></img>
                {author.username}
              </h3>
            </div>
            <div tw="col-span-5 p-5 mt-4 border-gray-300 shadow-md border-2 rounded">
              {
                <Markup
                  content={content}
                  allowElements={true}
                  allowAttributes={true}
                />
              }
            </div>
          </div>
          {user?.admin === "admin" && (
            <div tw="mt-2 flex justify-end gap-1">
              <Button onClick={toggleEditModal}>Sửa</Button>
              <Button onClick={toggleRemoveModal}>Xóa</Button>
            </div>
          )}
        </div>
        {/* Comment section */}
        <Title>Bình luận</Title>
        <div id="Comment">
          <CommentForm />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Fetch data from external API
  const res = await axios.get(`${process.env.baseUrl}/api/posts/${slug}`);

  const { data } = res;

  if (!data) {
    return { notFound: true };
  }

  // Pass data to the page via props
  return { props: { data } };
}
