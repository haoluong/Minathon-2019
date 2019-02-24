import React from 'react';
import './SignupForm.css';

const signupform = (props) => {
    return (
        <div className="signupForm">
            <form method="get">
                <span>Họ và tên</span><br />
                <span><input type="text" name="realname"></input></span><br /><br />
                <span>Ngày tháng năm sinh</span><br />
                <span><input type="date" name="birthday"></input></span><br /><br />
                <span>Giới tính</span><br />
                <span>
                    <input type="radio" name="gender" value="male"></input>Nam
                    <input type="radio" name="gender" value="female"></input>Nữ
                </span><br /><br />
                <span>Email</span><br />
                <span><input type="email" name="email"></input></span><br /><br />
                <span>Mật khẩu</span><br />
                <span><input type="password" name="password"></input></span><br /><br />
                <span>Nhập lại mật khẩu</span><br />
                <span><input type="password" name="password"></input></span><br /><br />
                <span>Chứng minh nhân dân</span><br />
                <span><input type="text" name="cid"></input></span><br /><br />
                <span>Địa chỉ</span><br />
                <span><input type="text" name="address"></input></span><br /><br />
                <span><input type="submit" value="Đăng ký"></input></span>
            </form>
            <div className="closeButton">
                <button className="button" onClick={props.click}><img src="close.png" alt=""/></button>
            </div>
        </div>
    );
}

export default signupform;