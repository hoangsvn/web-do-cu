import { useEffect, useState } from "react";
import Authservice from "../Services/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faSignIn, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { AuthSV, TimeSV } from "../Services";

const EditProfile = () => {
    const usenavigate = useNavigate();
    const location = useLocation();
    const [edit, setEdit] = useState(false);
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

    }, [location]);


    const onChangeBtnEditUserInfo = (e) =>{
        e.preventDefault();
        try {
            AuthSV.UpdateUserInfo(fullname,phonenumber,address, brithDay,linkfacebook,linkinstagram,linktwitter)
                .then (data =>{
                    if (data.message.success){
                        toast.success(data.message.message);
                    } else {
                        toast.info(data.message.message);
                    }
                });

        } catch (error) {
            toast.error("Update User InFo Error");
        }
    }

    const setOnchangeFullname = (value) => {
        setEdit(true);
        setFullname(value);
    }

    const setOnchangePhone = (value) => {
        setEdit(true);
        setPhonenumber(value);
    }

    const setOnchangeLinkfacebook = (value) => {
        setEdit(true);
        setLinkfacebook(value);
    }

    const setOnchangeLinkInstagram = (value) => {
        setEdit(true);
        setLinkInstagram(value);
    }

    const setOnchangeLinkTwitter = (value) => {
        setEdit(true);
        setLinkTwitter(value)
    }

    const setOnchangeBrithDay = (value) => {
        setEdit(true);
        setBrithDay(value);
    }

    const setOnchangeAddress = (value) => {
        setEdit(true);
        setAddress(value);
    }

    return (

        <div className="row">
            <div className="col-lg-6 card mt-4">
                <div className="card-body">
                    <form className="form" onSubmit={(e)=>onChangeBtnEditUserInfo(e)}>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Fullname</span>
                            <input type="text" class="form-control" value={fullname} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setOnchangeFullname(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Brith Day</span>
                            <input type="date" class="form-control" value={TimeSV.formatDatetypeDate(brithDay)} placeholder="Brith Day" aria-label="Brith Day" aria-describedby="basic-addon1" onChange={(e) => setOnchangeBrithDay(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Phonenumber</span>
                            <input type="number" class="form-control" value={phonenumber} placeholder="Phonenumber" aria-label="Phonenumber" aria-describedby="basic-addon1" onChange={(e) => setOnchangePhone(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Address</span>
                            <input type="text" class="form-control" value={address} placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" onChange={(e) => setOnchangeAddress(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">LinkFacebook</span>
                            <input type="url" class="form-control" value={linkfacebook} placeholder="Url" aria-label="Url" aria-describedby="basic-addon1" onChange={(e) => setOnchangeLinkfacebook(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">LinkInstagram</span>
                            <input type="url" class="form-control" value={linkinstagram} placeholder="Url" aria-label="Url" aria-describedby="basic-addon1" onChange={(e) => setOnchangeLinkInstagram(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">LinkTwitter</span>
                            <input type="url" class="form-control" value={linktwitter} placeholder="Url" aria-label="Url" aria-describedby="basic-addon1" onChange={(e) => setOnchangeLinkTwitter(e.target.value)} />
                        </div>
                        {edit && <button className="btn btn-success"> Save </button>}
                    </form>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="row" >
                    <div className="col-lg-12 mt-4">
                        <div className="card  ">
                            <div className="card-body  ">
                                <img src="useravata.png" alt="avatar" class="rounded-circle img-fluid" />
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
                    <div className="col-lg-12 mt-5">
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
                        <div className="">
                            <div className="card mb-4 mb-lg-0">
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
                    </div>

                </div>
            </div>


        </div>

    );
}
export default EditProfile;