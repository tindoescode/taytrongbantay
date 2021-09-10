import Head from "next/head";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";
import onLogin from "../middleware/onLogin";
import { useDispatch, useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import Router from "next/router";

export default function Home() {
  const user = useSelector((state) => state.user);

  //TODO: Redirect logged in user to index
  // if (user) {
  //   Router.push("/");
  // }

  let inputName = useRef(null);
  let inputPassword = useRef(null);
  let inputRePassword = useRef(null);
  let inputUsername = useRef(null);
  let inputEmail = useRef(null);
  let inputGender = useRef(null);
  let dispatch = useDispatch();

  let loginBtnClicked = (e) => {
    e.preventDefault();

    try {
      let username = inputUsername.current.value;
      let name = inputName.current.value;
      let email = inputEmail.current.value;
      let password = inputPassword.current.value;
      let rePassword = inputRePassword.current.value;
      let gender = inputGender.current.value;

      if (!(username && name && email && password && rePassword && gender))
        throw "Xin hãy điền đủ các trường.";
      if (password !== rePassword)
        throw "Mật khẩu được nhập lại không chính xác!";

      axios
        .post("/api/register", { username, name, email, password, gender })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.code == 11000) {
              if (Object.keys(res.data.keyValue)[0] == "email")
                throw "Email đã được đăng ký";
              if (Object.keys(res.data.keyValue)[0] == "username")
                throw "Username đã được đăng ký";
            }

            toast.info("Đăng ký thành công, đang tự động đăng nhập...");
          }
        })
        .then(() => {
          // Automaticially login
          axios
            .post("/api/login", { username, password })
            .then(onLogin(dispatch, () => {}));
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <form method="POST" tw="mt-2">
          <Title>Đăng ký</Title>
          <div tw="flex flex-col space-y-4 select-none shadow-md p-2">
            <input
              tw="p-2 ring-green-200 ring-1"
              autoComplete="off"
              name="username"
              placeholder="Nick name (ví dụ: anhhungxadieu555)"
              type="text"
              ref={inputUsername}
            />
            <input
              tw="p-2 ring-green-200 ring-1"
              autoComplete="off"
              name="name"
              placeholder="Họ và tên (ví dụ: Cô Cô)"
              type="text"
              ref={inputName}
            />
            <input
              tw="p-2 ring-green-200 ring-1"
              autoComplete="off"
              name="email"
              placeholder="Email: "
              type="text"
              ref={inputEmail}
            />
            <input
              tw="p-2 ring-green-200 ring-1"
              autoComplete="off"
              name="password"
              placeholder="Mật khẩu"
              type="password"
              ref={inputPassword}
            />
            <input
              tw="p-2 ring-green-200 ring-1"
              autoComplete="off"
              name="password"
              placeholder="Nhập lại mật khẩu"
              type="password"
              ref={inputRePassword}
            />
            <select ref={inputGender} tw="p-2 ring-green-200 ring-1">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            <div tw="flex items-center">
              <input type="checkbox" tw="mr-2" id="agree" required />
              <label htmlFor="agree" tw="">
                Tớ đồng ý với những điều khoản của Taytrongbantay!
              </label>
            </div>

            <button
              onClick={loginBtnClicked}
              tw="bg-green-400 p-4 hover:bg-green-600 transition text-white"
              type="submit"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
