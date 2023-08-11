import { useEffect, useState } from "react";
import { ImageSV, SanPhamSV } from "../Services";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
 
const UpDatesanPham = () => {
    const { sid } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isChange,SetChange] = useState(false);
    const [sanpham, setSanPham] = useState({});
    const [isSuccess, setIsSuccess] = useState(true);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [Description, setDescription] = useState("");

    useEffect(() => {
        try {
            SanPhamSV.GetSanphambyID(sid)
                .then(data => {
                    if (data.message.success) {
                        setSanPham(data.sanpham);
                        setPrice(data.sanpham.price);
                        setName(data.sanpham.name);
                        setDescription(data.sanpham.desiption);
                        const previews = data.sanpham.listhinhanh.map(item => ImageSV.ImageUrlByLink(item.link));
                        setImagePreviews(previews);
                        console.log(imagePreviews);
                    } else {
                        toast.error("Failed to get product details");
                    }
                }).catch(error => {

                });
        } catch (error) {

        }

    }, [sid]);
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file)).concat(imagePreviews);
        setImagePreviews(previews);
    };

    const validate = () => {
        SetChange(true);
        if (name === "" || name === null) {
            toast.info("Please Enter Name");
            return false;
        } else if (price === "" || price === null) {
            toast.info("Please Enter Price");
            return false;
        } else if (Description === "" || Description === null) {
            toast.info("Please Enter Description");
            return false;
        }
        return true;

    }

    const updatesanpham = (e) => {
        e.preventDefault();
        if (validate()){

        } else {

        }

    };


    const handleImageDelete = (indexToDelete) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(indexToDelete, 1); 
        setImagePreviews(updatedPreviews);
    };
    
    return (
        <div >
            <form className="row" onSubmit={updatesanpham}>
                <div className="   col-lg-6 mt-5">
                    <div className="">
                        <span className="btn">
                            Images
                            
                        </span>
                        <input className="btn " type="file" multiple="5" onChange={handleFileChange} />
                        <div className="">
                            {imagePreviews.map((preview, index ) => (
                                
                                <span className="image-preview justify-content-start">
                                    <img className="ms-4 image" key={index} src={preview}  />
                                    <a className="delete-img-button " onClick={() => handleImageDelete(index)}><FaIcon icon={faTrashCan}/> </a>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="upload__box col-lg-6 mt-5">
                    <div className="upload__btn-box">
                        <label className="upload__btn">
                            <p>Edit InFO</p>
                        </label>
                        <br />
                        <input className="w-100 mt-4" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input> <br />
                        <input className="w-100 mt-4" type="number" min={0} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} ></input> <br />
                        <textarea className="w-100 mt-4" type="text" placeholder="Description" rows={10} value={Description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className="upload__img-wrap"></div>
                </div>
                { isSuccess && <button type="submit" className="btn btn-primary col-lg-6 offset-lg-3 mt-5 ">
                    Edit
                </button>}
            </form>
        </div>

    )


}

export default UpDatesanPham;