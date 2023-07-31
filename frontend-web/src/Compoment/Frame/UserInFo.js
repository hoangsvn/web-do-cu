import { useEffect, useState } from "react";
import Authservice from "../Services/Auth";
import { Link } from "react-router-dom";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
const InFo = () => {

    const [user, setUser] = useState({});
    const [isuser, setisUser] = useState(false);


    useEffect(() => {
        try {
            Authservice.ApiUserInFo()
                .then((result) => {
                    setUser(result);
                    setisUser(true);
                    console.log(result.userinfo);
                }).catch(error => console.log(error));
        } catch (error) {
            setisUser(false);
        }
    }, []);


    const FormUpdate = () => {
        return (
            <div className="row" >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
                <div className="col-lg-3 mt-5">
                    <div className="card ms-4 mb-4">
                        <div className="card-body text-center">
                            <img src="useravata.png" alt="avatar" class="rounded-circle img-fluid" />
                            <hr/>
                            <h4 className="text-start my-3">{user.userinfo.fullname }</h4>
                            <p className="text-muted text-start mb-1">{user.userinfo.email }</p>
                            <p className="text-muted text-start mb-4">{user.userinfo.listdiachi[0]?.huyen }</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 mt-5">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Full Name</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{user.userinfo.fullname }</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Username</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{user.userinfo.username }</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{user.userinfo.email }</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Phone</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">0123456789</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Address</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start text-start mb-0">VN</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mt-5">
                    <div className="">
                        <div class="card mb-4 mb-lg-0">
                            <div class="card-body p-0">
                                <ul class="list-group list-group-flush rounded-3">
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-twitter fa-lg" ></i>
                                        <p class="mb-0">ABCD</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-instagram fa-lg" ></i>
                                        <p class="mb-0">ABCD</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-facebook-f fa-lg" ></i>
                                        <p class="mb-0">ABCD</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const FormLogin = () => {
        return (
            <div className="row" >
                <div className="offset-lg-3 col-lg-6 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h2>You are not logged in</h2>
                            <Link className="t-none btn btn-success w-25" to={"/login"}><FaIcon icon={faSignIn} /> </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <body className="row">
            {isuser ? FormUpdate() : FormLogin()}
        </body>
    )
}
export default InFo;