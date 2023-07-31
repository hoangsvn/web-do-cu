

import ApiInFo from "./ApiInFo";

const API = ApiInFo.API


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", localStorage.getItem("token"));

const GetTop20Sanpham = () => {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(API + "/api/sanpham/top20", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Get Top 20 Error ");
            }
        }).then((result) => {
            return result;
        });
}


const DeleteSanPhamByID = (id) => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(API + "/api/sanpham/delete/id=" + id, requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not Delete SanPham By ID");
            }
        });
}

const GetSanphambyID = (id) => {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(API + "/api/sanpham/id=" + id, requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Get San Pham by id Fail");
            }
        });
}
const SanPhamService = {
    GetTop20Sanpham, GetSanphambyID, DeleteSanPhamByID

};
export default SanPhamService;