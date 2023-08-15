
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faSignOut, faSignIn, faBell, faStore, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthSV } from "../Services";
const AppHeader = () => {
    const [islogin, setISlogin] = useState(false);
    const usenavigate = useNavigate()
    useEffect(() => {
        try {
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
                        <div className="container-fluid">
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
                                <form className="ms-2 me-5">
                                    {
                                        islogin ?
                                            <button className="btn btn-danger " onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /></button> :
                                            <button className="btn btn-success " onClick={handleLogin}><FontAwesomeIcon icon={faSignIn} /></button>
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
