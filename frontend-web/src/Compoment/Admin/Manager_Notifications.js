import { useEffect } from "react";
import { useState } from "react";
import { AuthSV } from "../Services";
import { toast } from "react-toastify";
import { Fm_Notification } from "../Fragments"
const Manager_Notifications = () => {

    const [notification, setNotification] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('');

    useEffect(() => {
        try {
            AuthSV.getAdminNotification()
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

    const add =(e) =>{
        e.preventDefault();
        try {
            AuthSV.AdminAdddNotification(title,body)
            .then(data =>{
                console.log(data)
                if (data.message.success){
                    toast.success(data.message.message);
                } else {
                    toast.info(data.message.message);
                }
            }) .catch(err =>{
                toast.error("Add Notificatons Error");
            })
        } catch (error) {
            
        }
    }

    return (
        <div className=" row">
            <form  onSubmit={(e) =>add(e)} className="col-lg-8 offset-2">
                <div class="input-group mb-3">
                    <span class="input-group-text w-25" >Title</span>
                    <input type="text" class="form-control" value={title} placeholder="Title" aria-label="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text w-25" >Body</span>
                    <textarea rows={6} type="text" class="form-control" value={body} placeholder="Body" aria-label="Body" onChange={(e) => setBody(e.target.value)} />
                </div>
                <button className="btn btn-success"> Add </button>
            </form>
            {notification && notification.map((noti) => (
                <div className="col-lg-8 offset-2">
                    <Fm_Notification notification={noti} />
                </div>
            ))}
            {notification.length === 0 &&
                <div className="row">
                    <div className="card">
                        <h2 className="card-header ">No Notifications</h2>
                    </div>
                </div>
            }
        </div>
    );
}
export default Manager_Notifications;