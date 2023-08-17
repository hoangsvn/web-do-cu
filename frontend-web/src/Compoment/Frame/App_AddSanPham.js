import { useEffect, useState } from "react";
import { DanhMucSV, ImageSV, SanPhamSV } from "../Services";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
 


const AddSanPham = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [listdanhmuc, setListdanhmuc] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
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
    const onChangesetDanhmucid = (value) => {
        setDanhmuc(value);
        setIsSuccess(true);
    }
    const onChangesetName = (value) => {
        setIsSuccess(true);
        setName(value);
    }
    const onChangesetPrice = (value) => {
        SetPrice(value);
        setIsSuccess(true);
    }
    const onChangesetDes = (value) => {
        SetDescription(value);
        setIsSuccess(true);
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
                <div className=" col-lg-6 mt-5">
                    <div className="">
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" >Image</span>
                            <input type="file"  accept=".jpg, .jpeg, .png , .bmp" class="form-control" multiple="5" onChange={handleFileChange} />
                        </div>

                        <div className="mb-3">
                            {imagePreviews.map((preview, index) => (

                                <span className="image-preview justify-content-start">
                                    <img className="ms-4 image" key={index} src={preview} />
                                    <a className="delete-img-button " onClick={() => handleImageDelete(index)}><FontAwesomeIcon icon={faTrashCan} /> </a>
                                </span>
                            ))}
                        </div>
                    </div>


                </div>
                <div className=" col-lg-6 mt-5">
                    <div className="">
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" >Danh Mục</span>
                            <select class="form-select" aria-label="" placeholder="ChonDanhMuc" onChange={(e) => onChangesetDanhmucid(e.target.value)} >
                                {danhmuc && <option selected value={danhmuc.id}>{danhmuc.name}</option>}
                                {listdanhmuc.map((item) => (
                                    <option value={item.id} >{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" >Name</span>
                            <input type="text" class="form-control" value={name} placeholder="Name" aria-label="Name"  onChange={(e) => onChangesetName(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" >Price</span>
                            <input type="number" class="form-control" value={price} placeholder="Username" aria-label="Username"  onChange={(e) => onChangesetPrice(e.target.value)} />
                        </div>

                        <div class="input-group">
                            <span class="input-group-text w-25">Description</span>
                            <textarea class="form-control" placeholder="Description" rows={10} value={Description} onChange={(e) => onChangesetDes(e.target.value)} aria-label="With textarea"></textarea>
                        </div>

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