import Head from 'next/head';
import axios from 'axios';
import { useRef } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import onLogin from '../middleware/onLogin';

export default function Home() {
  let inputName = useRef(null);
  let inputPassword = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user) {
      Router.push('/');
    }
  }, [])

  let loginBtnClicked = (e) => {
    e.preventDefault();

    let username = inputName.current.value;
    let password = inputPassword.current.value;

    axios.post('/api/login', { username, password }).then(onLogin(res, dispatch, toggleLoginMenu)).catch(error => {
      console.log(error)
      toast.error(error);
    })

  }

  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
       <form className="flex items-center flex-col">
        <div className="flex items-center space-between">
          <label htmlFor="username" className="text-black mr-2">
            Tên đăng nhập
          </label>
          <input
            ref={inputName}
            name="username"
            className="rounded p-2 mt-2 ring-1 ring-green-500 text-black justify-self-end" placeholder="Tên đăng nhập" autoComplete="off"></input>
        </div>

        <div className="flex items-center space-between">
          <label htmlFor="username" className="text-black mr-2">
            Mật khẩu
          </label>
          <input
            ref={inputPassword}
            name="password"
            type="password"
            className="rounded p-2 my-2 ring-1 ring-green-500 text-black justify-self-end" placeholder="Mật khẩu" autoComplete="off"></input>
        </div>

        <button
          onClick={loginBtnClicked}
          className="rounded p-2 bg-green-300 hover:bg-green-500 text-white transition">Đăng nhập</button>

        <p className="text-black mt-5">Bạn chưa có tài khoản? <Link href="/register">
          <a className="font-bold hover:text-green-700 transition">Đăng ký ngay!</a>
        </Link>
        </p>
       </form>
      </main>
    </div>
  )
}
