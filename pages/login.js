import Head from 'next/head';
import axios from 'axios';
import { useRef } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Home() {
  let inputName = useRef(null);
  let inputPassword = useRef(null);

  let loginBtnClicked = (e) => {
    e.preventDefault();

    let username = inputName.current.value;
    let password = inputPassword.current.value;

    axios.post('/api/login', { username, password }).then((res) => {
      if(res.status === 200) {
          if(res.data.error) throw res.data.error;

          console.log('Login successfully!');

          localStorage.setItem('token', res.data.token);

          Router.push('/welcome-page');

          toggleLoginMenu();

          dispatch({
              type: 'ON_LOGIN',
              user: res.data.user
          });

          toast("Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘");

      }
    }).catch(error => {
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
       <form method="POST">
            <input name="username" placeholder="Username" type="text" ref={inputName} />
            <input name="password" placeholder="Password" type="password" ref={inputPassword} />
            <button onClick={loginBtnClicked} type="submit">Login</button>
       </form>
      </main>
    </div>
  )
}
