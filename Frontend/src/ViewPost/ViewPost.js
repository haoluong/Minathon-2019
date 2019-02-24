import React from 'react';
import './ViewPost.css';

const viewpost = (props) => {
    return (
        <div className="viewpost">
            <div className="main">
                <div className="header">I want to get this</div>
                <div>
                    <div className="left">
                        <img src="https://www.ikea.com/PIAimages/0517381_PE640656_S5.JPG" alt="" />
                    </div>
                    <div className="right">
                        <img src="https://www.ikea.com/PIAimages/0517381_PE640656_S5.JPG" alt="" />
                    </div>
                    <div className="another">
                        <img src="https://www.ikea.com/PIAimages/0517381_PE640656_S5.JPG" alt="" />
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="title">
                    <h3>Wooden Table</h3>
                </div>
                <div className="description">
                    <strong>Description:</strong> Đây là cái bàn abcdxyz năm tuổi.
                </div>
                <div className="sdt">
                    <strong>Phone number: </strong>0123456789
                </div>
                <div className="middle"><button className="postButton" onClick={props.click}>Register</button></div>
            </div>
            <div className="closeButtonArea">
                <button className="closeButton" onClick={props.click}></button>
            </div>
        </div>
    );
}

export default viewpost;