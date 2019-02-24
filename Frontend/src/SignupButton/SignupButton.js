import React from 'react';
import './SignupButton.css'

const signupbutton = (props) => {
    return (
        <div>
            <button className="signupButton" onClick={props.click}>Sign up</button>
        </div>
    );
}

export default signupbutton;