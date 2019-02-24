import React from 'react';
import './SignupButton.css'

const signupbutton = (props) => {
    return (
        <div>
            <button className="signupButton" onClick={props.click}>Đăng ký</button>
        </div>
    );
}

export default signupbutton;