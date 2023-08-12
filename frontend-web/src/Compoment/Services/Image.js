import ApiInFo from "./ApiInFo";

const API = ApiInFo.API
const ImageUrlByLink = (link) => {
    return `${API}/api/image/link=${link}`;
}
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", localStorage.getItem("token"));

const UploadImg = (Link, file) => {
    var formdata = new FormData();
    formdata.append("image", file);
    formdata.append("link", Link);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return fetch(API + "/api/image/upload", requestOptions)
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Canot Upload Image " + Link);
            }
        });
}
const DeleteHinhAnhInfo = (ide) => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(API+ "/api/hinhanh/delid="+ide, requestOptions)
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            } 
        });
}


const getImageBlod =(imageUrl)=>{
   return fetch(imageUrl)
        .then(response => response.blob())
        .then(imageBlob =>{
            return imageBlob;
        })
}

const ImageApi = {
    ImageUrlByLink, UploadImg, DeleteHinhAnhInfo , getImageBlod
}
export default ImageApi;