import { useState } from "react";

 

const Fg_UserAvatar = ({fullname,email}) => {
     
    const [name] = useState(fullname);
    const [mail] = useState(email);
    return (
        <div className="card ms-4 mt-4">
            <div className="card-body text-center">
                <img src="/useravata.png" alt="avatar" class="rounded-circle img-fluid" />
                <hr />
                <div class="input-group">
                    <label class="input-group-text w-25" >Fullname</label>
                    <label class="form-control text-start fw-bold" >{name}</label>
                </div>
                <div class="input-group mt-2">
                    <label class="input-group-text w-25" >Email</label>
                    <label class="form-control text-start" >{mail}</label>
                </div>
            </div>
        </div>
    );
}
export default Fg_UserAvatar;