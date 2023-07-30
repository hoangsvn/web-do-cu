import { useEffect, useState } from "react";
import Authservice from "../Services/Auth";
import { Link } from "react-router-dom";

const InFo = () => {

    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [isuser, setisUser] = useState(false);

    const Init = async () => {
        try {
            var user = Authservice.getCurrentUserApi();
            setName(user.fullname);
            setEmail(user.email);
            setisUser(true);
        } catch (error) {
            setisUser(false);
            console.error("Lỗi lấy thông tin người dùng", error);
        }
    };
    useEffect(() => {
        Init();
    }, [])


    const FormUpdate = () => {
        return (
            <div className="row" >
                <form className="offset-lg-3 col-lg-6 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h2>User InFo</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group text-start">
                                <label>Email <span className="errmsg"></span></label>
                                <input type="email" value={email}  className="form-control"></input>
                            </div>

                            <div className="form-group text-start">
                                <label>Full Name <span className="errmsg"></span></label>
                                <input type="username" value={name}   className="form-control"></input>
                            </div>
                            <div className="form-group text-start">
                                <label> Date <span className="errmsg"></span></label>
                                <input type="date" value={date}  className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary d-md-block w-100">Update</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
    const FormLogin = () => {
        return(
            <div className="row" >
                <div className="offset-lg-3 col-lg-6 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h2>You are not logged in</h2>
                            <Link className="t-none" to={"/login"}><h4>Login</h4> </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <body className="row">
            {isuser ? FormUpdate(): FormLogin()}
        </body>
    )
}
export default InFo;