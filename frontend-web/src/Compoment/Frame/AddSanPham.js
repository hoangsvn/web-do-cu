import { useEffect, useState } from "react";
import { DanhMucSV, ImageSV, SanPhamSV } from "../Services";
import { toast } from "react-toastify";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";


const AddSanPham = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [listdanhmuc, setListdanhmuc] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSuccess, setIsSuccess] = useState(true);
    const [price, SetPrice] = useState(0);
    const [danhmuc, setDanhmuc] = useState(0);
    const [name, setName] = useState("");
    const [Description, SetDescription] = useState("");

    useEffect(() => {
        try {
            DanhMucSV.GetAll()
                .then(data => {
                    if (data.message.success) {
                        setListdanhmuc(data.danhmuc);
                        console.log(listdanhmuc);
                    }
                }).catch(err => console.log(err));
        } catch (error) {

        }
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const validate = () => {
        if (name === "" || name === null) {
            toast.info("Please Enter Name")
            return false;
        } else if (price === "" || price === null) {
            toast.info("Please Enter Price")
            return false;
        } else if (Description === "" || Description === null) {
            toast.info("Please Enter Description")
            return false;
        }
        return true;

    }
    const handleImageDelete = (indexToDelete) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(indexToDelete, 1);
        setImagePreviews(updatedPreviews);
    };
    const addsanpham = (e) => {
        e.preventDefault();
        try {
            if (validate()) {
                SanPhamSV.AddSanpham(name, price, Description, imagePreviews.length, danhmuc)
                    .then(data => {
                        if (data.message.success) {
                            toast.success(data.message.message);
                            setIsSuccess(false);
                            
                            imagePreviews.forEach((preview, index) => {
                                ImageSV.UploadImg(data.sanpham.listhinhanh[index].link, selectedFiles[index]);
                                
                            });
                        } else {
                            toast.info(data.message.message)
                        }
                    }).catch(error => {
                        toast.error("Add Error")
                    })
            }

        } catch (error) {

        }
    };



    return (
        <div >
            <form className="row" onSubmit={addsanpham}>
                <div className="upload__box col-lg-6 mt-5">
                    <div className="upload__btn-box">
                        <span className="upload__btn btn">
                            Upload images
                        </span>
                        <input type="file" multiple="5" onChange={handleFileChange} />
                        <div>
                            {imagePreviews.map((preview, index) => (
                                <span className="image-preview">
                                    <img className="ms-4 image" key={index} src={preview} />
                                    <a className="delete-img-button " onClick={() => handleImageDelete(index)}><FaIcon icon={faTrashCan} /> </a>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <div className=" col-lg-6 mt-5">
                    <div className="">
                        <label className="">
                            <p>Upload InFO</p>
                        </label>
                        <br />
                        <select class="form-select" aria-label="" placeholder="ChonDanhMuc" onChange={(e) =>setDanhmuc(e.target.value)}>
                            <option selected value={0}>Chon Danh Muc</option>
                            {listdanhmuc.map((item) => (
                                <option value={item.id}    >{item.name}</option>
                            ))}
                        </select>
                        
                            <input className="w-100 mt-4 form-control" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input> <br />
                            <input className="w-100 mt-4 form-control" type="number" min={0} placeholder="Price" value={price} onChange={(e) => SetPrice(e.target.value)} ></input> <br />
                            <textarea className="w-100 mt-4 form-control" type="text" placeholder="Description" rows={10} value={Description} onChange={(e) => SetDescription(e.target.value)} ></textarea>
                    </div>

                </div>
                {isSuccess && <button type="submit" className="btn btn-primary col-lg-6 offset-lg-3 mt-5 ">
                    AddSanPham
                </button>}
            </form>
        </div>

    )


}

export default AddSanPham;