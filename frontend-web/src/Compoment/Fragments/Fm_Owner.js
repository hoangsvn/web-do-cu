import { useEffect, useState } from "react";
import { AuthSV } from "../Services";
import { toast } from "react-toastify";


const Fm_Owner = ({ uid }) => {
    const [isuser, SetUserOk] = useState(false);
    const [user, SetUser] = useState([]);
    useEffect(() => {
        AuthSV.ApiGetUserInfoPublic(uid)
            .then(udata => {
                if (udata.message.message) {
                    SetUser(udata.userinfo);
                    SetUserOk(true);
                } else {
                    toast.info("Cannot get User PubLic Info");
                }
            }).catch((err) => {
                toast.info("Error get User PubLic Info");
            })
    })
    return (
        <div className="card">
            {isuser && <div className="card-body text-center row" >
                <img src="/useravata.png" alt="avatar" class="rounded-circle img-fluid h-50 col-lg-4" />
                <div className='col-lg-8 d-block'>
                    <h4 className='text-start'> Owner : {user.userinfo.fullname} </h4>
                    <p className="text-muted text-start mb-1">{user.userinfo.phonenumber}</p>
                    <p className="text-muted text-start mb-1">{user.email}</p>
                    <p className="text-muted text-start mb-4">{user.listdiachi > 0 && user.listdiachi[0]?.huyen}</p>
                </div>
            </div>}
        </div>
    );
}
export default Fm_Owner;