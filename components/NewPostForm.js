import axios from "axios";
import { useState, useEffect, useRef } from "react";
import convertToSlug from "../utils/convertToSlug";
import Editor from "./CKEditor";
import { Widget } from "@uploadcare/react-widget";
import tw, { styled } from "twin.macro";

const ItemWrapper = styled.div`
  ${tw`flex flex-col mb-2`};
  & > div + div {
    margin-top: 0.5rem;
  }
`;

export default function NewPostForm({ onPostSubmit, initialState }) {
  const titleRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  const [description, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  if (initialState && slug) var old_slug = initialState?.slug;

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCats(res.data);

      if (res.data[0]) setCategory(res.data[0]._id);
    });
    if (initialState) {
      setContent(initialState.content);
      setTitle(initialState.title);
      setTags(initialState.tags);
      setThumbnail(initialState.thumbnail);
      setDesc(initialState.description);
      setCategory(initialState.category);
      setSlug(initialState.slug);
    }
  }, [initialState]);

  const onTitleChange = (e) => {
    setSlug(convertToSlug(e.target.value));
    setTitle(e.target.value);
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

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div tw="md:grid md:grid-cols-3 md:gap-4 my-2">
      <ItemWrapper>
        <div>
          <label htmlFor="title" tw="p-2 bg-green-400 text-white font-bold">
            Tiêu đề
          </label>
          <input
            onChange={onTitleChange}
            value={title}
            id="title"
            ref={titleRef}
            tw="w-full shadow p-3 border border-green-400 block mb-2"
            type="text"
            placeholder="Tiêu đề"
          ></input>
        </div>

        <div>
          <label htmlFor="slug" tw="p-2 bg-green-400 text-white font-bold">
            Đường dẫn (slug)
          </label>
          <input
            value={slug}
            id="slug"
            onChange={onSlugChange}
            tw="w-full shadow p-3 border border-green-400 block mb-2"
            type="text"
            placeholder="Đường dẫn"
          ></input>
        </div>

        <div>
          <label htmlFor="slug" tw="p-2 bg-green-400 text-white font-bold">
            Thumbnail
          </label>
          <div tw="shadow py-3 border border-green-400 mb-2 flex flex-col items-center p-2">
            {thumbnail && <img src={thumbnail} tw="mb-3" />}
            <Widget
              publicKey="533d4b8f6a11de77ba81"
              onChange={uploadToClient}
              clearable
            />
          </div>
        </div>

        <div>
          <label htmlFor="title" tw="p-2 bg-green-400 text-white font-bold">
            Chuyên mục
          </label>
          <select
            ref={categoryRef}
            tw="w-full bg-white shadow p-3 border border-green-400 block mb-2"
            value={category}
            onChange={onCategoryChange}
          >
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </ItemWrapper>

      <ItemWrapper tw="md:col-span-2">
        <div>
          <label tw="-mb-5 p-2 bg-green-400 text-white font-bold">
            Nội dung
          </label>
        </div>
        <Editor setContent={setContent} initialContent={content} />

        <div style={{ marginTop: "1rem" }}>
          <label
            htmlFor="title"
            tw="p-2 bg-green-400 text-white font-bold mt-4"
          >
            Mô tả
          </label>
          <textarea
            onChange={() => setDesc(descRef.current.value)}
            ref={descRef}
            tw="shadow w-full p-3 border border-green-400 block mb-2"
            type="text"
            value={description}
            placeholder="Một sự việc abc những tưởng không ai quan tâm nhưng thật sự quan trọng..."
            rows="4"
          ></textarea>
        </div>
      </ItemWrapper>

      <div tw="flex justify-end col-span-3">
        <button
          tw="p-4 bg-green-500 text-white mt-3 hover:bg-green-700 transition ease-in rounded shadow-md"
          onClick={onPostSubmit({
            old_slug,
            content,
            title,
            tags: "",
            slug,
            thumbnail,
            description,
            category,
          })}
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
}
