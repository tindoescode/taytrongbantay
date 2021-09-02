import Head from 'next/head'
import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <>
        <Head>
            <title>My App</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap" rel="stylesheet" />

        </Head>
        
        <Header />
        
        <div className="container max-w-6xl p-2 mx-auto mt-12 bg-white rounded-md bg-opacity-20">
            {children}
        </div>

        <Footer />
        <ToastContainer />
        </>
    );
}
 
export default Layout;
