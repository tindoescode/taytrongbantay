import Head from "next/head";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Alert from "./Alert";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { useSelector } from "react-redux";
import tw, { styled, css } from "twin.macro";
import { useEffect, useState } from "react";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

const Container = styled.div`
  ${tw`max-w-6xl p-2 mx-auto my-12 rounded-md bg-opacity-20`};
  // bg-white
`;

const Layout = ({ children }) => {
  var user = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  });

  return (
    <>
      <Head>
        <title>Taytrongbantay - Page chưa đặt tên</title>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="author" content="Taytrongbantay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Kết nối các bạn Thiếu niên cùng niềm tin. Kết thân trong tình yêu Chúa Cứu Thế. Kết tủa, lắng đọng qua những bài học thuộc linh phù hợp lứa tuổi."
        />
        <meta name="keywords" content="taytrongbantay, tay trong bàn tay" />
      </Head>

      <TopProgressBar />
      <Header />

      <Container>
        <Alert
          css={[
            css`
              animation: bounceInLeft 0.7s ease;
            `,
          ]}
        >
          {(user && <p>Bạn đã đăng nhập với {user.username}</p>) || (
            <p>
              Bạn chưa đăng nhập, hãy chọn{" "}
              <Link href="/login">
                <a>
                  <b>đăng nhập</b>
                </a>
              </Link>
              , hoặc{" "}
              <Link href="/register">
                <a>
                  <b>đăng ký</b>
                </a>
              </Link>{" "}
              để sử dụng hết tính năng của taytrongbantay nhé! 😛
            </p>
          )}
        </Alert>
        {children}
      </Container>

      {isVisible && (
        <div tw="fixed bottom-6 animate-bounce right-4 rounded bg-green-300 text-white p-1 text-2xl z-50">
          <div onClick={scrollToTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              tw="h-10 w-10 hover:(cursor-pointer opacity-60)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
