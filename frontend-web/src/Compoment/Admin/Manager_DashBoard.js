import {  useEffect, useState } from "react";
import { ManagerCategorys, ManagerImages, ManagerNotifications, ManagerProducts, ManagerUsers } from ".";
import { AuthSV } from "../Services";

import { Fm_NotAdmin} from "../Fragments"

const AdminDashBoard = () => {

    const [Display, setDisplay] = useState();


    useEffect(()  =>{

        if (AuthSV.IsAdmin()){

        } else {
            setDisplay(<Fm_NotAdmin />);
        }

    },[])

    const onBtnCategory = () => {
        if (AuthSV.IsAdmin()) setDisplay( <ManagerCategorys/>);
    }

    const onBtnUsers = () => {
        if (AuthSV.IsAdmin()) setDisplay(<ManagerUsers/> );
    }
    const onBtnNotification = () => {
        if (AuthSV.IsAdmin()) setDisplay(<ManagerNotifications /> );
    }
    const onBtnProDucts = () => {
        if (AuthSV.IsAdmin()) setDisplay( <ManagerProducts/>);
    }
    
    const onBtnImages = () => {
        if (AuthSV.IsAdmin()) setDisplay(<ManagerImages/> );
    }

    return (
        <div>
            <div className="row mt-2 ms-4 me-4 mb-2">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body text-start">
                            <h1>AdminDashBoard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row mt-2 ms-4 me-4 mb-2">
                    <div className="col-lg-2">
                        <ul className="card list-group">
                            <ui className="list-group-item text-start btn" onClick={() => onBtnUsers()}> Users </ui>
                            <ui className="list-group-item text-start btn" onClick={() => onBtnNotification()}> Notifications </ui>
                            <ui className="list-group-item text-start btn" onClick={() => onBtnCategory()}> Categorys </ui>
                            <ui className="list-group-item text-start btn" onClick={() => onBtnProDucts()}> Products </ui>
                            <ui className="list-group-item text-start btn" onClick={() => onBtnImages()}> Images </ui>
                        </ul>
                    </div>
                    <div className="col-lg-10 d-block">
                        <div className="card">
                            Display
                        </div>
                        <div className="card">
                            {Display}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminDashBoard;