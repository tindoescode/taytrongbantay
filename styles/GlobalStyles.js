import { Global, css } from "@emotion/react";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css`
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
  }
  body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  body::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #000000;
  }

  @keyframes boxAnimate {
    from {
      transform: rotate3d(1, 1, 1, 45deg);
    }
    to {
      transform: rotate3d(0, 0, 0, 45deg);
    }
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
