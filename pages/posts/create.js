import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import NewPostForm from "../../components/NewPostForm";
import Router from "next/router";
import { useSelector } from "react-redux";
import FacebookLoading from "../../components/FacebookLoading";

export default function NewPost() {
  let user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get("/api/user/getdata").then((res) => {
      if (!res.data.isLoggedIn || !["admin", "mod"].includes(res.data?.admin)) {
        Router.push("/");
      }
    });
  }, []);

  const onPostSubmit =
    ({ content, title, tags, slug, thumbnail, description, category }) =>
    (e) => {
      e.preventDefault();

      let tags = "none";

      axios
        .post("/api/posts/create", {
          content,
          title,
          tags,
          slug,
          thumbnail,
          description,
          category,
        })
        .then((res) => {
          if (res.data.title === title) {
            toast("Bài viết đã lên sóng🤗");

            Router.push(`/posts/${slug}`);
          } else {
            toast(`Lỗi: ${res.data.error}`);
          }
        });
    };

  if (!user)
    return (
      <p tw="flex items-center justify-center text-lg">
        Loading... <FacebookLoading />
      </p>
    );
  return (
    <>
      <NewPostForm onPostSubmit={onPostSubmit} />
    </>
  );
}
