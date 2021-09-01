import Head from 'next/head';
import axios from 'axios';
import { useRef } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Home() {
  let inputName = useRef(null);
  let inputPassword = useRef(null);
  let inputRePassword = useRef(null);
  let inputUsername = useRef(null);
  let inputEmail = useRef(null);
  let inputGender = useRef(null);


  let loginBtnClicked = (e) => {
    e.preventDefault();

    try {
      let username = inputUsername.current.value;
      let name = inputName.current.value;
      let email = inputEmail.current.value;
      let password = inputPassword.current.value;
      let rePassword = inputRePassword.current.value;
      let gender = inputGender.current.value;
  
      if(!(username && name && email && password && rePassword && gender)) throw "Xin hãy điền đủ các trường.";
      if(password !== rePassword) throw "Mật khẩu được nhập lại không chính xác!";

      axios.post('/api/register', { username, name, email, password, gender }).then((res) => {
        if(res.status == 200) {
          if(res.data.code == 11000) {
            if(Object.keys(res.data.keyValue)[0] == 'email') throw 'Email đã được đăng ký';
            if(Object.keys(res.data.keyValue)[0] == 'username') throw 'Username đã được đăng ký';
          }

          toast.info('Đăng ký thành công, đang tự động đăng nhập...');
        }
      }).then(() => {
        // Automaticially login
        axios.post('/api/login', { username, password }).then((res) => {
          if(res.status === 200) {
            toast.success('Bạn đã được đăng nhập tự động.');
    
            localStorage.setItem('token', res.data.token);
            Router.push('/welcome-page');
          }
        })
      }).catch(error => {
        toast.error(error);
      })
    }
    catch(error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
       <form method="POST" className="flex flex-col space-y-4 select-none">
            <input className="p-2 ring-green-200 ring-1" autoComplete="off" name="username" placeholder="Nick name (ví dụ: anhhungxadieu555)" type="text" ref={inputUsername} />
            <input className="p-2 ring-green-200 ring-1" autoComplete="off" name="name" placeholder="Họ và tên (ví dụ: Cô Cô)" type="text" ref={inputName} />            
            <input className="p-2 ring-green-200 ring-1" autoComplete="off" name="email" placeholder="Email: " type="text" ref={inputEmail} />
            <input className="p-2 ring-green-200 ring-1" autoComplete="off" name="password" placeholder="Mật khẩu" type="password" ref={inputPassword} />
            <input className="p-2 ring-green-200 ring-1" autoComplete="off" name="password" placeholder="Nhập lại mật khẩu" type="password" ref={inputRePassword} />
            <select ref={inputGender} className="p-2 ring-green-200 ring-1">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            <div className="flex items-center">
            <input type="checkbox" className="mr-2" id="agree" />
            <label htmlFor="agree" className="">Tớ đồng ý với những điều khoản của Taytrongbantay!</label>

            </div>

            <button onClick={loginBtnClicked} className="bg-green-200 p-4 hover:bg-green-400 transition text-white" type="submit">Đăng ký</button>              


       </form>
      </main>
    </div>
  )
}
