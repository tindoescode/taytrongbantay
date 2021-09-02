import Link from 'next/link';
import React, { useState, useRef, useEffect} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux'

function Header() {
    let [loginMenu, setLoginMenu] = useState(false);
    let user = useSelector((state) => state.user);

    const dispatch = useDispatch()

    let toggleLoginMenu = () => {
        setLoginMenu(!loginMenu);
    }

    let inputName = useRef(null);
    let inputPassword = useRef(null);

    let loginBtnClicked = (e) => {
      e.preventDefault();
      let username = inputName.current.value;
      let password = inputPassword.current.value;

      if(!(username && password)) throw 'Hãy nhập đầy đủ các trường'
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


    useEffect(() => {
        console.log("page initial render");

        

    }, []);

    return (<>
        <div className="Header shadow-md md:justify-around relative">
            <div className="flex-grow md:flex-grow-0 ml-2">
                <Link href="/">
                    <a><div className="Header--logo" /></a>
                </Link>
            </div>

            <div className="Navbar mr-2">
                <div className="Navbar--item hover:bg-green-300 hover:text-white transition">
                    <svg onClick={() => toggleLoginMenu()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person" viewBox="-2 -5 20 20" preserveAspectRatio="xMidYMid slice">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    { 
                        loginMenu 
                        
                        && 
                        
                        <div 
                            className={`login-form rounded-md flex absolute flex-col border bg-gray-200 p-2 shadow-sm select-none box-border transition-all ${loginMenu === false ? 'h-0' : 'h-auto'} right-0`} 
                            style={{top: '3.1rem'}}>
                            
                            <div className="flex items-center space-between justify-end">
                            <label htmlFor="username" className="text-black mr-2">
                                Tên đăng nhập
                            </label>
                            <input ref={inputName} 
                                name="username" 
                                className="rounded p-2 mt-2 ring-1 ring-green-500 text-black" placeholder="Tên đăng nhập" autoComplete="off"></input>
                            </div>

                            <div className="flex items-center space-between justify-end">
                            <label htmlFor="username" className="text-black mr-2">
                                Mật khẩu
                            </label>
                                                        <input 
                                                            ref={inputPassword}
                                                            name="password" 
                                                            type="password"
                                                            className="rounded p-2 my-2 ring-1 ring-green-500 text-black" placeholder="Mật khẩu" autoComplete="off"></input>    
                            </div>

                            <button 
                                onClick={loginBtnClicked}
                                className="rounded p-2 bg-green-300 hover:bg-green-500 text-white transition">Đăng nhập</button>

                            <p className="text-black">Bạn chưa có tài khoản? <Link href="/register">
                                <a className="font-bold hover:text-green-700 transition">Đăng ký ngay!</a>
                            </Link>
                            </p>
                        </div>
                    }
                </div>
                <div className="Navbar--item hover:bg-green-300 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => toast('Chức năng sắp ra mắt!')} fill="currentColor" className="bi bi-suit-heart stroke-1" viewBox="-2 -5 20 20" preserveAspectRatio="xMidYMid slice">
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                    </svg>  
                </div>
            </div>

            <style jsx>{
                `.Header {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    z-index: 100;
                    selection: none;
                }

                .Header a {
                    display: block;
                }

                .Header--logo {
                    background: url(/images/LOGO-TTBT2.png) no-repeat;
                    width: 40px;
                    height: 40px;
                    background-size: cover;
                }
                
                .Navbar {
                    height: 50px;
                    display: flex;
                }
                
                .Navbar--item svg {
                    min-height:70%;
                }

                .Navbar--item::first-child {
                    margin-right: 10px;
                }

                .login-form {
                    top: -100%;
                }

                .login-form--active {
                    top: 0;
                }
                `
            }</style>
        </div>

        { user && <div className="flex justify-center p-2 bg-green-200"><p>Bạn đã đăng nhập với {user.username}</p></div>}
        </>
    )
}

export default Header
