import { TimeSV } from "../Services";


const Fm_Notification = ({notification}) => {
    return (
        <div className="row" >
            <div className="mt-5">
                <div className="card">
                    <div className="card-header text-start">
                        <h2>{notification.title}</h2>
                    </div>
                    <textarea  className="w-100 card-body" rows={6} disabled>{notification.body}</textarea>
                    <div className="card-footer text-start">
                        <label >{TimeSV.formatDate(notification.create_at)}</label>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Fm_Notification;