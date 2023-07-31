import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
const AppFooter = () => {

    return (
        <footer>
            <div className="App-Footer">
                <p><a className="t-none" href="mailto:nguyenxuanhoang02042001@gmail.com"><FaIcon icon={faEnvelope} /></a></p>
            </div>
        </footer>
    );
}

export default AppFooter;
