import { useEffect, useState } from "react";
import Card from "./Card";
import Card2 from "./Card2";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import tw, { styled } from "twin.macro";
import ContentWrapper from "./ContentWrapper";

const NewPostWrapper = styled.div`
  ${tw`col-span-2 border-green-300 bg-gray-100`},
  min-height: 200px
`;
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
    <NewPostWrapper>
      <ContentWrapper>
        {posts &&
          posts.map((post, index) => {
            return (
              <Card2
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
      </ContentWrapper>
    </NewPostWrapper>
  );
}
