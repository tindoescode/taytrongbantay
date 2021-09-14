import Title from "../components/Title";
import ContentWrapper from "../components/ContentWrapper";
import tw, { styled, css } from "twin.macro";
import { useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "react-scroll-horizontal";

const Card = styled.div`
  ${tw`inline-block w-72 h-72 md:w-72 md:h-72 rounded-xl`}
  background: url(${(props) => props.bgUrl}) no-repeat top left;
  ${tw`bg-cover md:bg-cover`}
  ${tw`mr-1`}
  animation: fadeIn 1s linear;

  &:hover {
    cursor: pointer;
    // animation: topThenDown 7s;
  }
`;

export default function ChiBoCau() {
  const cbcPosts = useSelector((state) => state.cbcPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    // load cbc posts if not load yet
    if (!cbcPosts) {
      axios
        .get("/api/posts", { params: { category: "chi-bo-cau" } })
        .then((res) => {
          const { data } = res;

          if (data?.length > 0) {
            dispatch({ type: "LOAD_CBC_POST", posts: data });
          }
        });
    }
  }, []);

  return (
    <>
      <Title>Chị Bồ Câu's News</Title>
      <ContentWrapper
        css={[
          css`
            height: 19.3rem;
          `,
        ]}
      >
        <HorizontalScroll reverseScroll={true}>
          {cbcPosts &&
            cbcPosts.map((post) => {
              return <Card bgUrl={post.thumbnail} />;
            })}
        </HorizontalScroll>
      </ContentWrapper>
    </>
  );
}
