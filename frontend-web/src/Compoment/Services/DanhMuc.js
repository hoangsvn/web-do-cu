

import ApiInFo from "./ApiInFo";

const API = ApiInFo.API


const GetAll = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(API+ "/api/danhmuc/all", requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not All DanhMuc");
            }
        });
}


const GetID = (id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(API+ "/api/danhmuc/id="+id, requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not ID DanhMuc");
            }
        });
}

const DanhMuc = {
    GetAll,GetID
}
export default DanhMuc;