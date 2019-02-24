import React from 'react';
import './ItemList.css';

const itemlist = (props) => {
    return (
        <div className="item" onClick={props.click}>
            <div className="imageContainer">
                <img src={props.source} alt="" />
            </div> 
            <div className="textContainer">
                {props.txt}
            </div>
        </div>
    );
}

export default itemlist;