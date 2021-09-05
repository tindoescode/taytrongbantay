import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import convertToSlug from "../../utils/convertToSlug";
import Editor from "../../components/CKEditor";
import Router from "next/router";
import { Widget } from "@uploadcare/react-widget";

export default function NewPost() {
  const titleRef = useRef();
  const descRef = useRef();
  const [slug, setSlug] = useState("");
  const [description, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    axios.get("/api/user/getdata").then((res) => {
      if (!res.data.isLoggedIn || !["admin", "mod"].includes(res.data?.admin)) {
        Router.push("/");
      }
    });
  }, []);

  const onTitleChange = (e) => {
    setSlug(convertToSlug(e.target.value));
  };
  // Thumbnail upload handler
  const uploadToClient = (e) => {
    console.log(e);
    setThumbnail(e.originalUrl);
    setCreateObjectURL(URL.createObjectURL(e.originalUrl));
  };

  const onSlugChange = (e) => {
    setSlug(e.target.value);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let title = titleRef.current.value;
    let tags = "none";

    axios
      .post(
        "/api/posts/new-post",
        { content, title, tags, slug, thumbnail, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
      <div className="md:grid grid-cols-3 gap-4 mb-2">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="p-2 bg-green-400 text-white font-bold"
            >
              Tiêu đề
            </label>
            <input
              onChange={onTitleChange}
              id="title"
              ref={titleRef}
              className="shadow w-full p-3 border border-green-400 block mb-2"
              type="text"
              placeholder="Tiêu đề"
            ></input>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="slug"
              className="p-2 bg-green-400 text-white font-bold"
            >
              Đường dẫn (slug)
            </label>
            <input
              value={slug}
              id="slug"
              onChange={onSlugChange}
              className="shadow p-3 border border-green-400 block mb-2"
              type="text"
              placeholder="Đường dẫn"
            ></input>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="slug"
              className="p-2 bg-green-400 text-white font-bold"
            >
              Thumbnail
            </label>
            <div className="shadow w-full p-3 border border-green-400 mb-2 flex flex-col items-center">
              <Widget
                publicKey="533d4b8f6a11de77ba81"
                onChange={uploadToClient}
                clearable
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-2">
          <label className="p-2 bg-green-400 text-white font-bold">
            Nội dung
          </label>
          <Editor setContent={setContent} />

          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="p-2 bg-green-400 text-white font-bold mt-4"
            >
              Mô tả
            </label>
            <textarea
              onChange={() => setDesc(descRef.current.value)}
              ref={descRef}
              className="shadow w-full p-3 border border-green-400 block mb-2"
              type="text"
              placeholder="Một sự việc abc những tưởng không ai quan tâm nhưng thật sự quan trọng..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end col-span-3">
          <button
            className="p-4 bg-green-500 text-white mt-3 hover:bg-green-700 transition ease-in rounded shadow-md"
            onClick={onPostSubmit}
          >
            Đăng bài
          </button>
        </div>
      </div>
    </>
  );
}
