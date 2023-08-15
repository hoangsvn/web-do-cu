


const Fm_Link = ({linktwitter,linkinstagram,linkfacebook }) => {

    return (
        <div className="card ms-4 mb-4 mb-lg-0">
            <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i className="fab fa-twitter fa-lg" ></i>
                        <p className="mb-0 ms-4">{linktwitter}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i className="fab fa-instagram fa-lg" ></i>
                        <p className="mb-0 ms-4">{linkinstagram}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i className="fab fa-facebook fa-lg" ></i>
                        <p className="mb-0 ms-4">{linkfacebook}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Fm_Link;