import React from 'react';
import './ItemList.css';

const itemlist = () => {
    return (
        <div className="item">
            <div className="imageContainer">
                <img src="https://www.groupize.com/wp-content/uploads/2018/06/image-demo-b-2-400x320.png" alt="" />
            </div> 
            <div className="textContainer">
                Hello
            </div>
        </div>
    );
}

export default itemlist;