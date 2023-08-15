import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API;

const myHeaders =ApiInFo.myHeaders();


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

const getAllLink =()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    return  fetch(API+"/api/image/alllink", requestOptions)
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