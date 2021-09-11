import Head from "next/head";
import axios from "axios";
import { useRef } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import onLogin from "../middleware/onLogin";
import tw, { styled } from "twin.macro";

export default function Home() {
  const user = useSelector((state) => state.user);

  if (user) {
    Router.push("/");
  }

  let inputName = useRef(null);
  let inputPassword = useRef(null);
  const dispatch = useDispatch();

  let loginBtnClicked = (e) => {
    e.preventDefault();

    let username = inputName.current.value;
    let password = inputPassword.current.value;

    axios
      .post("/api/login", { username, password })
      .then(onLogin(dispatch, () => {}))
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <form tw="flex items-center flex-col">
          <div tw="flex items-center justify-between">
            <label htmlFor="username" tw="text-black mr-2">
              Tên đăng nhập
            </label>
            <input
              ref={inputName}
              name="username"
              tw="rounded p-2 mt-2 ring-1 ring-green-500 text-black justify-self-end"
              placeholder="Tên đăng nhập"
              autoComplete="off"
            ></input>
          </div>

          <div tw="flex items-center justify-between">
            <label htmlFor="username" tw="text-black mr-2">
              Mật khẩu
            </label>
            <input
              ref={inputPassword}
              name="password"
              type="password"
              tw="rounded p-2 my-2 ring-1 ring-green-500 text-black justify-self-end"
              placeholder="Mật khẩu"
              autoComplete="off"
            ></input>
          </div>

          <button
            onClick={loginBtnClicked}
            tw="rounded p-2 bg-green-300 hover:bg-green-500 text-white transition"
          >
            Đăng nhập
          </button>

          <p tw="text-black mt-5">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register">
              <a tw="font-bold hover:text-green-700 transition">
                Đăng ký ngay!
              </a>
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
