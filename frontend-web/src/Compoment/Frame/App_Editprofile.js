import { useEffect, useState } from "react";
import Authservice from "../Services/Service_Auth";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthSV, TimeSV } from "../Services";
import { Fm_EditProfile, Fm_Link, Fm_UserAvatar, Fm_UserInFo } from "../Fragments";

const EditProfile = () => {

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


    const onChangeBtnEditUserInfo = (e) => {
        e.preventDefault();
        try {
            AuthSV.UpdateUserInfo(fullname, phonenumber, address, brithDay, linkfacebook, linkinstagram, linktwitter)
                .then(data => {
                    if (data.message.success) {
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
            <div className="col-lg-6 ">
                <div className="card mt-4">
                    <div className="card-body">
                        <form className="form" onSubmit={(e) => onChangeBtnEditUserInfo(e)}>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >Fullname</span>
                                <input type="text" class="form-control" value={fullname} placeholder="Username" aria-label="Username" onChange={(e) => setOnchangeFullname(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >Brith Day</span>
                                <input type="date" class="form-control" value={TimeSV.formatDatetypeDate(brithDay)} placeholder="Brith Day" aria-label="Brith Day" onChange={(e) => setOnchangeBrithDay(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >Phonenumber</span>
                                <input type="number" class="form-control" value={phonenumber} placeholder="Phonenumber" aria-label="Phonenumber" onChange={(e) => setOnchangePhone(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >Address</span>
                                <input type="text" class="form-control" value={address} placeholder="Address" aria-label="Address" onChange={(e) => setOnchangeAddress(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >LinkFacebook</span>
                                <input type="url" class="form-control" value={linkfacebook} placeholder="Url" aria-label="Url" onChange={(e) => setOnchangeLinkfacebook(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >LinkInstagram</span>
                                <input type="url" class="form-control" value={linkinstagram} placeholder="Url" aria-label="Url" onChange={(e) => setOnchangeLinkInstagram(e.target.value)} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-25" >LinkTwitter</span>
                                <input type="url" class="form-control" value={linktwitter} placeholder="Url" aria-label="Url" onChange={(e) => setOnchangeLinkTwitter(e.target.value)} />
                            </div>
                            {edit && <button className="btn btn-success"> Save </button>}
                        </form>
                    </div>
                </div>
                
            </div>
            <div className="col-lg-6">
                <div className="" >
                    <div className="col-lg-12 mt-4">
                        <Fm_UserAvatar fullname={fullname} email={email} />
                    </div>
                    <div className="col-lg-12 mt-5">
                        <Fm_UserInFo fullname={fullname} email={email} username={username} address={address} brithDay={brithDay} phonenumber={phonenumber} />
                    </div>
                    <div className="col-lg-12 mt-5">
                        <Fm_Link linkfacebook={linkfacebook} linkinstagram={linkinstagram} linktwitter={linktwitter}></Fm_Link>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default EditProfile;