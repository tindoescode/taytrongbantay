import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function NewPosts() {
  let [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("/api/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="col-span-2 border-1 border-green-300 bg-gray-100"
      style={{ minHeight: "200px" }}
    >
      <div className="p-2">
        {posts &&
          posts.map((post, index) => {
            return (
              <PostCard
                thumbnail={post.thumbnail}
                key={index}
                href={"/posts/" + post.slug}
                title={post.title}
                category={post.category}
                description={post.description}
              />
            );
          })}
        {!posts && <Skeleton count={3} height={150} />}
      </div>
    </div>
  );
}
