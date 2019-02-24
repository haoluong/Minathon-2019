import React from 'react';
import './Sidebar.css'

const sidebar = (props) => {
    return (
        <aside className="sideBar" role="navigation">
            <div className="currentUser">
                <img src="https://bermurahhati.com/wp-content/uploads/2018/12/user.png" alt="" />
                <p><a href="localhost:3000">ALL FOR ONE</a></p>
            </div>
            <button className="menuItem" onClick={props.click}><img src="https://img.icons8.com/ios/50/000000/give-gift.png" alt="" /> Donate</button>
            {/* <button className="menuItem"><img src="https://img.icons8.com/ios/50/000000/receive-cash-filled.png" alt="" /> Receive</button> */}
        </aside>
    );
}

export default sidebar;