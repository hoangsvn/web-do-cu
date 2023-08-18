

import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API;
const GetTop20Sanpham = () => {


    return fetch(API + "/api/sanpham/top20", ApiInFo.GET())
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
const AddSanpham = (sname, sprice, sdesiption, slistimgsize, sdanhmucid) => {

    var raw = JSON.stringify({
        "user_id": -1,
        "price": sprice,
        "name": sname,
        "desiption": sdesiption,
        "listhinhanh": [],
        "listdanhmuc": [],
        "listimgsize": slistimgsize,
        "danhmucid": sdanhmucid
    });

    return fetch(API + "/api/sanpham/add", ApiInFo.POSTBODY(raw))
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Add San Pham Error ");
            }
        }).then((result) => {
            return result;
        });
}

const DeleteSanPhamByID = (id) => {
    
    return fetch(API + "/api/sanpham/delete/id=" + id, ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Can Not Delete SanPham By ID");
            }
        });
}

const GetSanphambyID = (id) => {

    return fetch(API + "/api/sanpham/id=" + id, ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Get San Pham by id Fail");
            }
        });
}



const UpdateSanPham = (sid, sname, sprice, sdesiption, slistimgsize, sdanhmucid) => {
    var raw = JSON.stringify({
        "id": sid,
        "user_id": -1,
        "price": sprice,
        "name": sname,
        "desiption": sdesiption,
        "listimgsize": slistimgsize,
        "danhmucid": sdanhmucid
    });


    return fetch(API + "/api/sanpham/update", ApiInFo.POSTBODY(raw))
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Update San Pham Error ");
            }
        }).then((result) => {
            return result;
        });
}


const Search = (search) => {
    

    return fetch(API + "/api/sanpham/search=" + search, ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            }
        });

}
const getAllSanPham = () => {
   

    return fetch(API +"/api/sanpham/all", ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            }
        });
}

const BuySanPhamID = (id) => {

    return fetch(API +"/api/sanpham/buy/id="+id, ApiInFo.GET())
        .then((response) => {
            if (response.ok || response.status === 400) {
                return response.json();
            }
        });
}
const SanPhamService = {
    GetTop20Sanpham, GetSanphambyID, DeleteSanPhamByID,
    AddSanpham, UpdateSanPham, Search ,getAllSanPham,BuySanPhamID

};
export default SanPhamService;