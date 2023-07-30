
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Authservice from "../Services/Auth";

const AppHeader = () => {
    const [fullname, setFullname] = useState("");
    const [islogin, setISlogin] = useState(false);
    const location = useLocation();
 
    const fetchCurrentUser = async () => {
        try {
            const currentUser = await Authservice.getCurrentUserApi();
            setFullname(currentUser.fullname);
            setISlogin(true);
        } catch (error) {
            setISlogin(false);
            setFullname("");
            console.error("Lỗi lấy thông tin người dùng", error);
        }
    };
    useEffect(() => {
        fetchCurrentUser();
    }, [location ]);

    const handleLogout = () => {
        Authservice.ApiLogout();
    };

    return (
        <header>
            <title>Đồ Cũ </title>
            <div className="App-header">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/info">InFo</Link>
                <span style={{ marginLeft: '50%' }}>Welcome <b>{fullname}</b></span>
                { !islogin ?
                    <Link className="nav-item right" to="/login">Login</Link> :
                    <Link className="nav-item right" to="/login" onClick={handleLogout}>Logout</Link>
                }
            </div>
        </header>
    );
};

export default AppHeader;
