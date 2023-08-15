import { useEffect, useState } from "react";
import { AuthSV  ,TimeSV} from "../Services";
import { toast } from "react-toastify";


const Fm_EditProfile = ({ fullname ,setfullname,phonenumber,setphonenumber,address,setaddress,brithDay ,setbrithDay,linkfacebook,setlinkfacebook,linkinstagram,setlinkinstagram,linktwitter,setlinktwitter}) => {
 
    const [edit, setEdit] = useState(false);
    const [fullname1, setFullname] = useState(fullname);
    const [phonenumber1, setPhonenumber] = useState(phonenumber);
    const [linkfacebook1, setLinkfacebook] = useState(linkfacebook);
    const [linkinstagram1, setLinkInstagram] = useState(linkinstagram);
    const [linktwitter1, setLinkTwitter] = useState(linktwitter);
    const [address1, setAddress] = useState(address);
    const [brithDay1, setBrithDay] = useState(brithDay);


    useEffect(()=>{

    },[])

    const onChangeBtnEditUserInfo = (e) => {
        e.preventDefault();
        try {
            AuthSV.UpdateUserInfo(fullname1, phonenumber1, address1, brithDay1, linkfacebook1, linkinstagram1, linktwitter1)
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
    );
}
export default Fm_EditProfile;