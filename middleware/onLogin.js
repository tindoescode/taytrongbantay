import nookies from 'nookies'

const onLogin = (res) => {
  if (res.status === 200) {
    if (res.data.error) throw res.data.error;

    let { token } = res.data
    console.log('Login successfully!');

    // localStorage.setItem('token', res.data.token);

    nookies.set(null, 'ttbt_token', token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    Router.push('/welcome-page');

    toggleLoginMenu();

    dispatch({
      type: 'ON_LOGIN',
      user: res.data.user
    });

    toast("Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘");

  }
}

export default onLogin