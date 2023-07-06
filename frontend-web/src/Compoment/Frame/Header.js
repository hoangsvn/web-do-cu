import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"
const Header = () => {
    // const usenavigate = useNavigate();
    // const location = useLocation();
    // useEffect(() => {
    //     if (location.pathname === '/login' || location.pathname === '/register') {
    //         showmenuupdateupdate(false);
    //     } else {
    //         showmenuupdateupdate(true);
    //         let username = sessionStorage.getItem('username');
    //         if (username === '' || username === null) {
    //             usenavigate('/login');
    //         } else {
    //             displayusernameupdate(username);
    //         }
    //     }

    // }, [location])
    return (
        <div>
            <div className="App-Header">
                <Link className="nav-item" to={'/'}>Home</Link>
                <Link className="nav-item" to={'/info'}>InFo</Link>
                {/* <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span> */}
                <Link className="nav-item"style={{ float: 'right' }} to={'/login'}>Logout</Link>
            </div>
        </div>
    );
}

export default Header;
