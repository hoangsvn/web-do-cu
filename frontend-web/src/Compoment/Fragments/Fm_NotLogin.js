import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const From_NotLogin = () => {
    return (
        <div className="row" >
            <div className="offset-lg-3 col-lg-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h2>You are not logged in</h2>
                    </div>
                    <div className="card-body">
                        <Link className="t-none btn btn-success w-25" to={"/login"}><FontAwesomeIcon icon={faSignIn} /> </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default From_NotLogin;