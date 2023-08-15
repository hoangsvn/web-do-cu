import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthSV } from "../Services";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        AuthSV.ApiLogout();
    }, []);

    const proceedLogin = (e) => {
        e.preventDefault();

        if (validate()) {

            AuthSV.ApiLogin(username, password)
                .then(() => {
                    navigate("/home");
                })
                .catch((error) => {
                    toast.error("Login Error");
                });
        }
    };

    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false;
            toast.warning("Please Enter Username");
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Please Enter Password");
        }
        return result;
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group text-start">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group text-start">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="">
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </div>
                            <div className="mt-3 card-footer">
                                <Link className="left t-none" to="/forgotpassword">
                                    Forgot password
                                </Link>
                                <Link className="right t-none" to="/register">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
