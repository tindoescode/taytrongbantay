import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import NewPostForm from "../../components/NewPostForm";
import Router from "next/router";

export default function NewPost() {
  // const [slug, setSlug] = useState("");
  // const [category, setCategory] = useState("");
  // const [categories, setCats] = useState([]);
  // const [description, setDesc] = useState("");
  // const [content, setContent] = useState("");
  // const [thumbnail, setThumbnail] = useState(null);

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
        .post(
          "/api/posts/create",
          { content, title, tags, slug, thumbnail, description, category },
        )
        .then((res) => {
          if (res.data.title === title) {
            toast("Bài viết đã lên sóng🤗");

            Router.push(`/posts/${slug}`);
          } else {
            toast(`Lỗi: ${res.data.error}`);
          }
        });
    };

  return (
    <>
      <NewPostForm http://localhost:3000/={onPostSubmit} />
    </>
  );
}
