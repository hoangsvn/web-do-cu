

import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API

const myHeaders =ApiInFo.myHeaders();

const GetAll = () => {
    var requestOptions = {
        headers: myHeaders,
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
        headers: myHeaders,
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
const AddNewCategory = (newCategory) => {
    
    var requestOptions = {
        headers: myHeaders,
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(API+ "/api/danhmuc/add="+newCategory, requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Add New DanhMuc");
            }
        });
}

 
const DanhMuc = {
    GetAll,GetID,AddNewCategory
}
export default DanhMuc;