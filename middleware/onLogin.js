import { toast } from "react-toastify";

const onLogin = (dispatch, toggleLoginMenu) => (res) => {
  if (res.status === 200) {
    if (res.data.error) throw res.data.error.message;
    if (!res.data.user) throw "Tên đăng nhập hoăc mật khẩu không hợp lệ";

    console.log("Login successfully!");

    toggleLoginMenu();

    dispatch({
      type: "ON_LOGIN",
      user: res.data.user,
    });

    toast(
      "Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘"
    );
  }
};

export default onLogin;
