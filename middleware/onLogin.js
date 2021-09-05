import { toast } from 'react-toastify'

const onLogin = (dispatch, toggleLoginMenu) => (res) => {
  if (res.status === 200) {
    if (res.data.error) throw res.data.error;
    if(!res.data.user) throw 'Tên đăng nhập hoăc mật khẩu không hợp lệ'

    console.log('Login successfully!');

    // let { ttbt_token } = res.data
    // nookies.set(null, 'ttbt_token', ttbt_token, {
    //   maxAge: 7 * 24 * 60 * 60,
    //   path: '/',
    // })

    toggleLoginMenu();

    dispatch({
      type: 'ON_LOGIN',
      user: res.data.user
    })

    toast("Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘");
  }
}

export default onLogin