import { useEffect, useState } from "react";
import { ManagerCategorys, ManagerImages, ManagerProducts, ManagerUsers } from "./";







const AdminDashBoard = () => {

    const [Display, setDisplay] = useState();
    const onBtnCategory = () => {
        setDisplay( <ManagerCategorys/>)
    }

    const onBtnUsers = () => {
        setDisplay(<ManagerUsers/> )
    }
    const onBtnNotification = () => {
        setDisplay( )
    }
    const onBtnProDucts = () => {
        setDisplay( <ManagerProducts/>)
    }
    
    const onBtnImages = () => {
        setDisplay(<ManagerImages/> )
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
                        <div className="card mt-1 ">
                            {Display}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminDashBoard;