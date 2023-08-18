

import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API


const GetAll = () => {
    

    return fetch(API+ "/api/danhmuc/all", ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not All DanhMuc");
            }
        });
}


const GetID = (id) => {
    

    return fetch(API+ "/api/danhmuc/id="+id, ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not ID DanhMuc");
            }
        });
}
const AddNewCategory = (newCategory) => {


    return fetch(API+ "/api/danhmuc/add="+newCategory, ApiInFo.GET())
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