import ApiInFo from "./ApiInFo";

const API =ApiInFo.API
const ImageUrlByLink = (link) =>{
    return `${API}/api/image/link=${link}`;
}

const ImageApi = {
    ImageUrlByLink
}
export default ImageApi;