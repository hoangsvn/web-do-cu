
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authservice from "../Services/Auth";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faSignOut, faSignIn, faBell, faUser, faStore, faUserCircle } from "@fortawesome/free-solid-svg-icons";



const AppHeader = () => {
    const [fullname, setFullname] = useState("");
    const [islogin, setISlogin] = useState(false);
    const usenavigate = useNavigate()

   
    useEffect(() => {
        try {
            const currentUser =  Authservice.getCurrentUserApi();
            setFullname(currentUser.fullname);
            setISlogin(true);
        } catch (error) {
            setISlogin(false);
            setFullname("");
        }
    }, []);

    const handleLogout = () => {
        Authservice.ApiLogout();
    };
    const handleLogin = () => {
        Authservice.ApiLogout();
        usenavigate("/login")
    }



    return (

        <header>
            <title>Đồ Cũ </title>
            <div className="App-header">
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
                        <div className="container-fluid">
                            <a className="navbar-brand ms-4" href="/"><FaIcon icon={faHome}></FaIcon></a>
                            <div className="collapse navbar-collapse" id="navbarsExample02">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/myrepository/listcart"><FaIcon icon={faShoppingCart} /></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/notification"><FaIcon icon={faBell} /></a>
                                    </li>
                                </ul>
                                <form className="w-50">
                                    <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                                </form>
                                <ul className="navbar-nav ms-2">
                                    <li>
                                        <a className="nav-link active" href="/info"><FaIcon icon={faUserCircle} ></FaIcon></a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-2">
                                    <li>
                                        <a className="nav-link active" href="/myrepository/listsanpham"><FaIcon icon={faStore} ></FaIcon></a>
                                    </li>
                                </ul>
                                <form className="ms-2 me-5">
                                    {
                                        islogin ?
                                            <button className="btn btn-danger " onClick={handleLogout}><FaIcon icon={faSignOut} /></button> :
                                            <button className="btn btn-success " onClick={handleLogin}><FaIcon icon={faSignIn} /></button>
                                    }
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>


    );
};

export default AppHeader;
