import tw, { styled } from "twin.macro";

const ContentWrapper = ({ children }) => {
  return <div tw="bg-gray-100 p-2 shadow mb-2">{children}</div>;
};

export default ContentWrapper;
