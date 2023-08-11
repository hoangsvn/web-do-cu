import ApiInFo from "./ApiInFo";

const API = ApiInFo.API
const ImageUrlByLink = (link) => {
    return `${API}/api/image/link=${link}`;
}

const UploadImg = (Link , file) => {
    var formdata = new FormData();
    formdata.append("image", file);
    formdata.append("link", Link);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost/api/image/upload", requestOptions)
        .then(response => {
            if (response.ok || response.status ===400){
                return response.json();
            } else {
                throw new Error("Canot Upload Image "+ Link);
            }
        });
}

const ImageApi = {
    ImageUrlByLink,UploadImg
}
export default ImageApi;