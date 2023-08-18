import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API;

const ImageUrlByLink = (link) => {
    return `${API}/api/image/link=${link}`;
}


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
    

    return fetch(API+ "/api/hinhanh/delid="+ide, ApiInFo.GET())
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

const getAllLink =()=>{
    
    return  fetch(API+"/api/image/alllink", ApiInFo.GET())
    .then(response => {
        if (response.ok || response.status === 400) {
            return response.json();
        } 
    });
       
}

const ImageApi = {
    ImageUrlByLink, UploadImg, DeleteHinhAnhInfo , getImageBlod ,getAllLink
}
export default ImageApi;