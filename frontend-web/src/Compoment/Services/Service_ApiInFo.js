
const API = "http://localhost";


const myHeaders = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    return myHeaders;
}


 

const POST = () => {
    return {
        method: 'POST',
        headers: myHeaders(),
        redirect: 'follow'
    };
};
const GET = () => {
    return {
        method: 'GET',
        headers: myHeaders(),
        redirect: 'follow'
    };
};
 

const POSTBODY = (raw) => {
    return {
        method: 'POST',
        body: raw,
        headers: myHeaders(),
        redirect: 'follow'
    };
};
const GETBODY = (raw) => {
    return {
        method: 'GET',
        body: raw,
        headers: myHeaders(),
        redirect: 'follow'
    };
};
 
const ApiInFo = {
    API,
    myHeaders,
    GET, POST ,POSTBODY ,GETBODY
}
export default ApiInFo;