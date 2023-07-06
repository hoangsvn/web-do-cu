import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header  from "../Frame/Header";
import Footer from "../Frame/Footer";
 
const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{ sessionStorage.clear(); },[]);

    const ProceedLogin = (e) => {
        // e.preventDefault();
        toast('Please Enter Username');
        toast('Please Enter Username');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": username,
            "password": password
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if(validate()){
            fetch("http://localhost/api/auth/signin", requestOptions)
            .then((res) => {
                return res.json();
            } )
            .then(response => response.text())
            .then(result => console.log(result))
            .catch((err) => {
                toast.error('Login Failed :' + err.message);
            });
        };
 
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <Header/>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group text-start">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input type="text"      value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group text-start">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password"  value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="" >
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </div>
                            <div className="mt-3"> 
                                <Link className="btn btn-success w-100" to={'/register'}>Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;
