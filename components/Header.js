import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import onLogin from "../middleware/onLogin";
import tw, { styled, css } from "twin.macro";

const HeaderWrapper = styled.div`
  ${tw`flex items-center shadow-md px-3 justify-between md:justify-around fixed w-screen top-0 bg-white z-50`};
`;
const HeaderLogo = styled.div`
  background: url(/images/LOGO-TTBT2.png) no-repeat;
  width: 40px;
  height: 40px;
  background-size: cover;
  ${tw``};
`;
const Navbar = styled.div`
  height: 50px;
  ${tw`flex flex-grow justify-end md:flex-grow-0 mr-2`};
`;

const NavbarItem = styled.div`
  & > svg {
    min-height: 70%;
  }
  &:first-of-type {
    margin-right: 10px;
  }
  ${tw`hover:bg-green-300 hover:text-white transition `};
`;

function Header() {
  let [loginMenu, setLoginMenu] = useState(false);
  let user = useSelector((state) => state.user);
  let inputName = useRef(null);
  let inputPassword = useRef(null);

  const dispatch = useDispatch();

  let toggleLoginMenu = () => {
    setLoginMenu(!loginMenu);
  };

  useEffect(() => {
    // TODO: Check the cookie
    axios
      .get("/api/user/getdata")
      .then((res) => {
        if (!res.data.isLoggedIn) throw "Chưa đăng nhập";

        let user = res.data;
        dispatch({
          type: "ON_LOGIN",
          user,
        });
      })
      .then(() => {
        console.log("user loaded");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let loginBtnClicked = (e) => {
    e.preventDefault();
    let username = inputName.current.value;
    let password = inputPassword.current.value;

    if (!(username && password)) throw "Hãy nhập đầy đủ các trường";
    axios
      .post("/api/login", { username, password })
      .then(onLogin(dispatch, toggleLoginMenu))
      .catch((error) => {
        toast.error(error);
        inputName.current.value = "";
        inputPassword.current.value = "";
      });
  };

  const checkLoginState = async (authResponse) => {
    let { accessToken } = authResponse;

    var response = await axios.post("/api/auth/facebook", {
      token: accessToken,
    });

    console.log(response);
    console.log("fbID", response.data.user.facebookId);
    if (authResponse.userID == response.data.user.facebookId) {
      onLogin(dispatch, toggleLoginMenu)(response);
    } else {
      toast.error(`Đăng nhập thất bại!`);
    }
  };

  const facebookLoginButtonCLick = async (e) => {
    e.preventDefault();

    const { authResponse } = await new Promise(window.FB.login);

    console.log(authResponse);

    await checkLoginState(authResponse);
  };

  const handleLogoutBtn = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("/api/logout");

    if (data.code == 200) {
      dispatch({
        type: "ON_LOGOUT",
      });
    }
  };

  return (
    <>
      <HeaderWrapper>
        <div>
          <Link href="/">
            <a>
              <HeaderLogo />
            </a>
          </Link>
        </div>

        <Navbar>
          <NavbarItem tw="md:relative">
            <a onClick={() => toggleLoginMenu()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-person"
                tw="w-10 h-10"
                viewBox="-2 -5 20 20"
                preserveAspectRatio="xMidYMid slice"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </a>
            <div
              css={[
                tw`rounded-md absolute`,
                tw`bg-gray-200 shadow-sm`,
                tw`box-border duration-200 h-0`,
                tw`right-0 md:w-96`,
                css`
                  // transition: all 0.6s cubic-bezier(1, 0.01, 0.53, 1.72);
                  top: 3.1rem;
                `,
                loginMenu &&
                  css`
                    animation: boxAnimate 0.6s ease;
                    height: fit-content;
                    padding: 0.5rem;
                  `,
              ]}
            >
              {loginMenu && !user && (
                <form>
                  <div tw="grid md:(grid-cols-3) items-center gap-0.5">
                    <label htmlFor="username" tw="text-black mr-2">
                      Tên đăng nhập
                    </label>
                    <input
                      ref={inputName}
                      name="username"
                      tw="col-span-2 rounded p-2 ring-1 ring-green-500 text-black"
                      placeholder="Tên đăng nhập"
                    ></input>
                  </div>

                  <div tw="grid mt-2 md:(grid-cols-3) items-center">
                    <label htmlFor="username" tw="text-black mr-2">
                      Mật khẩu
                    </label>
                    <input
                      ref={inputPassword}
                      name="password"
                      type="password"
                      tw="col-span-2 rounded p-2 mb-2 ring-1 ring-green-500 text-black"
                      placeholder="Mật khẩu"
                    ></input>
                  </div>

                  <button
                    onClick={loginBtnClicked}
                    tw="rounded p-2 bg-green-300 hover:bg-green-500 text-white transition"
                  >
                    Đăng nhập
                  </button>

                  <p tw="text-black leading-9">
                    Bạn chưa có tài khoản?{" "}
                    <Link href="/register">
                      <a tw="font-bold hover:text-green-700 transition">
                        Đăng ký ngay!
                      </a>
                    </Link>
                  </p>

                  <button
                    tw="rounded shadow p-2 text-white"
                    className="facebook"
                    onClick={facebookLoginButtonCLick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-person"
                      tw="w-4 h-4 inline-block mr-2 mb-1"
                      viewBox="0 0 50 50"
                    >
                      <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path>
                    </svg>
                    Log In With Facebook
                  </button>
                </form>
              )}

              {loginMenu && user && (
                <div tw="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    width={30}
                    tw="mr-2 flex-shrink"
                  ></img>
                  <div tw="text-black w-80">
                    <h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        tw="inline h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {user.username} / {user.name}
                    </h2>
                    <h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        tw="h-6 w-6 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                      {user.admin}{" "}
                      {user.admin == "admin" ? (
                        <>
                          |{" "}
                          <Link href="/admin">
                            <a>Quản trị</a>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </h2>
                    <Link href="#">
                      <a>Đổi mật khẩu</a>
                    </Link>{" "}
                    |{" "}
                    <Link href="#">
                      <a>Cài đặt</a>
                    </Link>{" "}
                    | <button onClick={handleLogoutBtn}>Đăng xuất</button>
                  </div>
                </div>
              )}
            </div>
          </NavbarItem>

          <NavbarItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => toast("Chức năng sắp ra mắt!")}
              fill="currentColor"
              tw="w-10 h-10"
              viewBox="-2 -5 20 20"
              preserveAspectRatio="xMidYMid slice"
            >
              <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
            </svg>
          </NavbarItem>
        </Navbar>

        <style jsx>{`
          .facebook {
            background: #548ae1;
          }
          .facebook:hover {
            background: #0e52b0;
          }
          .Header a {
            display: block;
          }

          .login-form {
          }

          .login-form--active {
            top: 0;
          }
        `}</style>
      </HeaderWrapper>
    </>
  );
}

export default Header;
