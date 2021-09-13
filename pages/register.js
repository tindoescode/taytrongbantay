import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import onLogin from "../middleware/onLogin";
import { useDispatch, useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import Router from "next/router";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Form from "../components/Form";

export default function Home() {
  const user = useSelector((state) => state.user);

  if (user) {
    Router.push("/");
  }

  let dispatch = useDispatch();
  const onSubmit =
    () =>
    ({ username, name, email, password, re_password, gender }) => {
      // console.log(username, name, email, password, re_password, gender);

      try {
        if (!(username && name && email && password && re_password && gender))
          throw "Xin hãy điền đủ các trường.";
        if (password !== re_password)
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
              if (res.data?.errors) {
                throw res.data.message;
              }

              toast.info("Đăng ký thành công, đang tự động đăng nhập...");

              // Automaticially login
              axios
                .post("/api/login", { username, password })
                .then(onLogin(dispatch, () => {}));

              Router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
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

      <main tw="max-w-lg mx-auto shadow-lg">
        <Title>Đăng ký</Title>
        <div>
          <Form tw="flex flex-col gap-1 p-2" onSubmit={onSubmit()}>
            <Input
              name="username"
              placeholder="Nick name (ví dụ: anhhungxadieu555)"
            />
            <Input
              name="name"
              required={true}
              placeholder="Họ và tên (ví dụ: Cô Cô)"
            />
            <Input name="email" required={true} placeholder="Email: " />
            <Input
              name="password"
              require={true}
              type="password"
              placeholder="Password"
            />
            <Input
              autoComplete="off"
              name="re_password"
              required={true}
              placeholder="Nhập lại mật khẩu"
              type="password"
            />
            <Select
              tw="block p-2 border-green-200 border-2 rounded"
              name="gender"
              required={true}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </Select>
            {/* <div tw="flex items-center">
              <input type="checkbox" tw="mr-2" id="agree" required />
              <label htmlFor="agree" tw="">
                Tớ đồng ý với những điều khoản của Taytrongbantay!
              </label>
            </div> */}

            <Button>Đăng ký</Button>
          </Form>
        </div>
      </main>
    </div>
  );
}
