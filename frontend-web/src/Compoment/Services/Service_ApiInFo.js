
const API = "http://localhost";


const myHeaders = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    return myHeaders;
}

const ApiInFo = {
    API,
    myHeaders
}
export default ApiInFo;