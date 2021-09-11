import Head from "next/head";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { useSelector } from "react-redux";
import tw, { styled, css } from "twin.macro";

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

const Cloud = styled.div`
  background: url("./images/cloud.svg") no-repeat center;
  animation: flyFromLeft 10s linear infinite;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
`;

const Alert = styled.div`
  ${tw`rounded mb-4 flex justify-center p-2 bg-green-200`};
`;
const Layout = ({ children }) => {
  var user = useSelector((state) => state.user);
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

      <Cloud />
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

      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
