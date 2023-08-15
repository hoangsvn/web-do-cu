import { useEffect, useState } from "react";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { AuthSV } from "../Services";
import { Fm_Link, Fm_NotLogin, Fm_UserAvatar, Fm_UserInFo } from "../Fragments"

const InFo = () => {

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
            AuthSV.ApiUserInFo()
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
                <div className="col-lg-6">
                    <Fm_UserAvatar fullname={fullname} email={email} />
                </div>
                <div className="col-lg-6">
                    <Fm_UserInFo fullname={fullname} email={email} username={username} address={address} phonenumber={phonenumber} brithDay={brithDay}/>
                </div>

                <div className="col-lg-12 mt-5">
                    <Fm_Link linkfacebook={linkfacebook} linktwitter={linktwitter} linkinstagram={linkinstagram} />
                </div>
                <div className="card col-lg-8 offset-2 mt-5">
                    <div className="card-body ">
                        <a href="/editprofile"><FontAwesomeIcon icon={faUserPen} ></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <body className="row">
            {isuser ? FormUpdate() : <Fm_NotLogin />}
        </body>
    )
}
export default InFo;