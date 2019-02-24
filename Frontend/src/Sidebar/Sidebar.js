import React from 'react';
import './Sidebar.css'

const sidebar = () => {
    return (
        <aside className="sideBar" role="navigation">
            <div className="currentUser">
                <img src="https://bermurahhati.com/wp-content/uploads/2018/12/user.png" alt="" />
                <p><a href="localhost:3000">Username</a></p>
            </div>
            <button className="menuItem"><img src="https://img.icons8.com/ios/50/000000/give-gift-filled.png" alt="" /> Cần cho</button>
            <button className="menuItem"><img src="https://img.icons8.com/ios/50/000000/receive-cash-filled.png" alt="" /> Cần nhận</button>
        </aside>
    );
}

export default sidebar;