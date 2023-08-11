

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
const AddSanpham = ( sname , sprice ,sdesiption , slistimgsize ,sdanhmucid) => {

    var raw = JSON.stringify({
        "user_id" : -1,
        "price": sprice,
        "name": sname,
        "desiption": sdesiption,
        "listhinhanh": [],
        "listdanhmuc": [] ,
        "listimgsize" : slistimgsize ,
        "danhmucid" : sdanhmucid
      });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(API + "/api/sanpham/add", requestOptions)
        .then((response) => {
            if (response.ok || response.status === 400 ) {
                return response.json();
            } else {
                throw new Error("Add San Pham Error ");
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
    GetTop20Sanpham, GetSanphambyID, DeleteSanPhamByID,AddSanpham

};
export default SanPhamService;