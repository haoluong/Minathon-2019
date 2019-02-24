import React from 'react';
import './LoginForm.css';

const loginform = (props) => {
    return (
        <div className="loginForm">
            <form method="get">
                <span>Email/Số điện thoại</span><br />
                <span><input type="text" name="username"></input></span><br /><br /><br />
                <span>Mật khẩu</span><br />
                <span><input type="password" name="password"></input></span><br /><br /><br />
                <span><input type="submit" value="Đăng nhập"></input></span>
            </form>
            <div className="closeButton">
                <button className="button" onClick={props.click}><img src="close.png" alt=""/></button>
            </div>
        </div>
    );
}

export default loginform;