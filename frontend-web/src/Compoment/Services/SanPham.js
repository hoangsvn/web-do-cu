

const API = "http://localhost";

const GetTop20Sanpham = () => {
    var requestOptions = {
        method: 'GET',
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

const SanPhamService = {
    GetTop20Sanpham

};
export default SanPhamService;