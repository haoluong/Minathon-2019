import React from 'react';
import './PostNewPost.css';

const postnewpost = (props) => {
    return (
        <div className="post">
            <div className="theform">
                <div className="header">I want to give something</div>
                <div className="form">
                    <form method="get" id="postnew">
                        <p><strong>Choose 3 pictures</strong></p>
                        Picture 1: <input type="file" name="image1" accept="image/png, image/jpg"/><br />
                        Picture 2: <input type="file" name="image2" accept="image/png, image/jpg"/><br />
                        Picture 3: <input type="file" name="image3" accept="image/png, image/jpg"/><br />
                        <p><strong>Title</strong></p>
                        <textarea rows="1" cols="70" name="title" form="postnew"></textarea><br/>
                        <p><strong>Description</strong></p>
                        <textarea rows="4" cols="70" name="description" form="postnew"></textarea><br /><br/>
                        <div className="middle"><button className="postButton">Post</button></div>
                    </form>
                </div>
            </div>
            <div className="closeButtonArea">
                <button className="closeButton" onClick={props.click}></button>
            </div>
        </div>
    );
}

export default postnewpost;