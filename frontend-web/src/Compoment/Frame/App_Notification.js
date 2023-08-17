import { useEffect } from "react";
import { useState } from "react";
import { AuthSV } from "../Services";
import { toast } from "react-toastify";
import { Fm_Notification } from "../Fragments"
const Notification = () => {

    const [notification, setNotification] = useState([]);

    useEffect(() => {
        try {
            AuthSV.getNotification()
                .then(data => {
                    if (data.message.success) {
                        console.log(data);
                        setNotification(data.notification);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch(err => {
                    toast.error("Error getNotification")
                })
        } catch (error) {

        }
    }, [])

    return (
        <div className=" row">
            {notification && notification.map((noti) => (
                <div className="col-lg-8 offset-2">
                    <Fm_Notification notification={noti} />
                </div>
            ))}
            {notification.length === 0 &&
                <div className="row">
                    <div className="card">
                        <h2 className="card-header ">No Notification</h2>
                    </div>
                </div>
            }
        </div>
    );
}
export default Notification;