import { useEffect, useState } from "react";
import Authservice from "../Services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { faSignIn, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { TimeSV } from "../Services";

const InFo = () => {



    const usenavigate = useNavigate();
    const [isuser, setisUser] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [linkfacebook, setLinkfacebook] = useState("");
    const [linkinstagram, setLinkInstagram] = useState("");
    const [linktwitter, setLinkTwitter] = useState("");
    const [address, setAddress] = useState("");
    const [brithDay, setBrithDay] = useState("");

    useEffect(() => {

        try {
            Authservice.ApiUserInFo()
                .then((result) => {
                    setisUser(true);
                    setUsername(result.userinfo.username);
                    setFullname(result.userinfo.userinfo && result.userinfo.userinfo.fullname);
                    setEmail(result.userinfo.email);
                    setPhonenumber(result.userinfo.userinfo && result.userinfo.userinfo.phonenumber);
                    setLinkfacebook(result.userinfo.userinfo && result.userinfo.userinfo.linkfacebook);
                    setLinkInstagram(result.userinfo.userinfo && result.userinfo.userinfo.linkinstagram);
                    setLinkTwitter(result.userinfo.userinfo && result.userinfo.userinfo.linktwitter);
                    setBrithDay(result.userinfo.userinfo && result.userinfo.userinfo.datebirth);
                    setAddress(result.userinfo.userinfo && result.userinfo.userinfo.address);
                }).catch(error => {
                    
                });
        } catch (error) {
            toast.error("You Not Login")
        }

    }, []);




    const FormUpdate = () => {
        return (
            <div className="row" >
                <div className="col-lg-6 mt-5">
                    <div className="card ms-4 mb-4">
                        <div className="card-body text-center">
                            <img src="/useravata.png" alt="avatar" class="rounded-circle img-fluid" />
                            <hr />
                            <div class="input-group">
                                <label class="input-group-text w-25 h-50" for="inputGroupFile01">Fullname</label>
                                <p class="form-control text-start fw-bold" id="inputGroupFile01">{fullname}</p>
                            </div>
                            <div class="input-group">
                                <label class="input-group-text w-25 h-50" for="inputGroupFile01">Email</label>
                                <p class="form-control text-start" id="inputGroupFile01">{email}</p>
                            </div>
                            <div class="input-group">
                                <label class="input-group-text w-25 h-50" for="inputGroupFile01">Address</label>
                                <p class="form-control text-start" id="inputGroupFile01">{address}</p>
                            </div>
                            <div class="input-group">
                                <label class="input-group-text w-25 h-50" for="inputGroupFile01">BrithDay</label>
                                <p class="form-control text-start" id="inputGroupFile01">{TimeSV.formatDate(brithDay)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-5">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Full Name</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{fullname}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Username</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{username}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{email}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Phone</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{phonenumber}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 text-start">Address</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted text-start mb-0">{address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 mt-5">

                    <div className="card ms-4 mb-4 mb-lg-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fab fa-twitter fa-lg" ></i>
                                    <p className="mb-0 ms-4">{linktwitter}</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fab fa-instagram fa-lg" ></i>
                                    <p className="mb-0 ms-4">{linkinstagram}</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fab fa-facebook fa-lg" ></i>
                                    <p className="mb-0 ms-4">{linkfacebook}</p>

                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="card col-lg-8 offset-2 mt-5">
                    <div className="card-body ">
                        <a href="/editprofile"><FaIcon icon={faUserPen} ></FaIcon></a>
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