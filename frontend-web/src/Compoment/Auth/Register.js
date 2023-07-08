import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () =>{
    const [username, usernameupdate]    = useState('');
    const [password, passwordupdate]    = useState('');
    const [email   , emailupdate]       = useState('');
    return ( 
        <div className="row">
       
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form /* onSubmit={ProceedLogin}  */className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group text-start">
                                <label>Email <span className="errmsg"></span></label>
                                <input type="email"      value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                            </div>
                            
                            <div className="form-group text-start">
                                <label>User Name <span className="errmsg"></span></label>
                                <input type="username"      value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group text-start">
                                <label>Password <span className="errmsg"></span></label>
                                <input type="password"  value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary d-md-block w-100">Register</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default Register;