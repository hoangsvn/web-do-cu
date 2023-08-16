
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faSignOut, faSignIn, faBell, faStore, faUserCircle, faDashboard } from "@fortawesome/free-solid-svg-icons";
import { AuthSV } from "../Services";
const AppHeader = () => {
    const [islogin, setISlogin] = useState(false);
    const [IsAdmin, setAdmin] = useState(false);
    const usenavigate = useNavigate()
    useEffect(() => {
        try {
            setAdmin(AuthSV.IsAdmin());
            AuthSV.getCurrentUserApi(); 
            setISlogin(true);
        } catch (error) {
            setISlogin(false);
        }
    }, []);

    const handleLogout = () => {
        AuthSV.ApiLogout();
        usenavigate("/login");
    };
    const handleDasboard = () => {
        AuthSV.ApiLogout();
        usenavigate("/dashboard");
    };
    const handleLogin = () => {
        AuthSV.ApiLogout();
        usenavigate("/login")
    }
    const onChangesearch = () => {
        clearTimeout(stsearch);
        var stsearch = setTimeout(() => {
            var spsearch = document.getElementById("spsearch");
            usenavigate("/search/" + spsearch.value);
        }, 500);
    }


    return (

        <header>
            <title>Đồ Cũ </title>
            <div className="App-header">
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
                        <div className="container-fluid ms-5 me-5">
                            <a className="navbar-brand ms-4" href="/"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></a>
                            
                            <div className="collapse navbar-collapse" id="navbarsExample02">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/myrepository/listcart"><FontAwesomeIcon icon={faShoppingCart} /></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/notification"><FontAwesomeIcon icon={faBell} /></a>
                                    </li>
                                </ul>
                                <form className="w-50">
                                    <input className="form-control" type="text" placeholder="Search" id="spsearch" aria-label="Search" onChange={(e) => onChangesearch()}></input>
                                </form>
                                <ul className="navbar-nav ms-2">
                                    <li>
                                        <a className="nav-link active" href="/info"><FontAwesomeIcon icon={faUserCircle} ></FontAwesomeIcon></a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-2">
                                    <li>
                                        <a className="nav-link active" href="/myrepository/listsanpham"><FontAwesomeIcon icon={faStore} ></FontAwesomeIcon></a>
                                    </li>
                                </ul>
                                <div className="ms-2 me-5">
                                {IsAdmin && <button className="btn btn-outline-success ms-2" onClick={handleDasboard}><FontAwesomeIcon icon={faDashboard} /></button> }
                                    {islogin ?
                                        <button className="btn btn-danger ms-2" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /></button> :
                                        <button className="btn btn-success ms-2" onClick={handleLogin}><FontAwesomeIcon icon={faSignIn} /></button>
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>


    );
};

export default AppHeader;
