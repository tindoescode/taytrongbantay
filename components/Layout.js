import Head from 'next/head'
import React from 'react'
import Footer from './Footer';
import Header from './Header';
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "nprogress/nprogress.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

const Layout = ({ children }) => {
    return (<>
        <Head>
            <title>Taytrongbantay - Page chưa đặt tên</title>
            <meta httpEquiv="x-dns-prefetch-control" content="on" />
            <meta name="author" content="Taytrongbantay" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Kết nối các bạn Thiếu niên cùng niềm tin. Kết thân trong tình yêu Chúa Cứu Thế. Kết tủa, lắng đọng qua những bài học thuộc linh phù hợp lứa tuổi."  />
            <meta name="keywords" content="taytrongbantay, tay trong bàn tay" />
        </Head>
        
        <TopProgressBar />
        <Header />
        
        <div className="container max-w-6xl p-2 mx-auto my-12 bg-white rounded-md bg-opacity-20">
            {children}
        </div>

        <Footer />
        <ToastContainer />
        </>
    );
}
 
export default Layout;
