import React from 'react';
import './LoginButton.css'

const loginbutton = (props) => {
    return (
        <div>
            <button className="loginButton" onClick={props.click}>Sign in</button>
        </div>
    );
}

export default loginbutton;