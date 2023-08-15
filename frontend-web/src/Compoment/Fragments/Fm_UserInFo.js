import { TimeSV } from "../Services";


const Fm_UserInfo = ({ fullname, username, email ,phonenumber,address ,brithDay }) => {
 
    return (
        <div className="card ms-4 mt-4">
            <div className="card-body text-center">
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start">Full Name</p>
                    <p className="text-muted text-start mb-0">{fullname}</p>
                </div>
                <hr />
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start">Username</p>
                    <p className="text-muted text-start mb-0">{username}</p>
                </div>
                <hr />
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start">Email</p>
                    <p className="text-muted text-start mb-0">{email}</p>
                </div>
                <hr />
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start">Phone</p>
                    <p className="text-muted text-start mb-0">{phonenumber}</p>
                </div>
                <hr />
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start">Address</p>
                    <p className="text-muted text-start mb-0">{address}</p>
                </div>
                <hr />
                <div className="d-flex">
                    <p className="mb-0 w-25 text-start" >BrithDay</p>
                    <p className="text-muted text-start mb-0" >{TimeSV.formatDate(brithDay)}</p>
                </div>
            </div>
        </div>
    );
}
export default Fm_UserInfo;