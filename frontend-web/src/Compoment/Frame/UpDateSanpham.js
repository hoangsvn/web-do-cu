import { useEffect, useState } from "react";
import { ImageSV, SanPhamSV, DanhMucSV } from "../Services";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const UpDatesanPham = () => {
    const { sid } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isChange, SetChange] = useState(false);
    const [sanpham, setSanPham] = useState({});


    const [uploadIma, setuploadIma] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [listdanhmuc, setListdanhmuc] = useState([]);
    const [listhinhanh, setListHinhAnh] = useState([]);
    const [listdeletehinhanh, Setlistdeletehinhanh] = useState([]);
    const [danhmucid, setDanhmucid] = useState(0);
    const [danhmuc, setDanhMuc] = useState([]);
    useEffect(() => {
        try {
            DanhMucSV.GetAll()
                .then(data => {
                    if (data.message.success) {
                        setListdanhmuc(data.danhmuc);
                        console.log(listdanhmuc);
                    }
                }).catch(err => console.log(err));

            SanPhamSV.GetSanphambyID(sid)
                .then(data => {
                    if (data.message.success) {
                        setSanPham(data.sanpham);
                        setPrice(data.sanpham.price);
                        setName(data.sanpham.name);
                        setDescription(data.sanpham.desiption);
                        const previews = data.sanpham.listhinhanh.map(item => ImageSV.ImageUrlByLink(item.link));
                        setImagePreviews(previews);
                        setListHinhAnh(data.sanpham.listhinhanh);
                        if (Array.from(data.sanpham.listdanhmuc).length > 0) {
                            setDanhMuc(data.sanpham.listdanhmuc[0]);
                            setDanhmucid(data.sanpham.listdanhmuc[0].id);
                        }
                    } else {
                        toast.error("Failed to get product details");
                    }
                }).catch(error => {

                });
        } catch (error) {

        }

    }, [sid]);


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
        try {
            if (validate()) {
                SanPhamSV.UpdateSanPham(sid, name, price, Description, selectedFiles.length, danhmucid)
                    .then(data => {
                        if (data.message.success) {
                            toast.success(data.message.message);
                            setIsSuccess(false);

                            if (imagePreviews.length > 0 && uploadIma) {

                                try {
                                    listhinhanh.forEach((item) => {
                                        ImageSV.DeleteHinhAnhInfo(item.id);
                                    })
                                } catch (error) {

                                }
                                imagePreviews.forEach((preview, index) => {
                                    try {
                                        ImageSV.UploadImg(data.sanpham.listhinhanh[index].link, selectedFiles[index]);
                                    } catch (error) {
                                        toast.info("Upload Image Error link=" + data.sanpham.listhinhanh[index].link);
                                    }

                                });

                            }

                        } else {
                            toast.info(data.message.message)
                        }
                    }).catch(error => {
                        toast.error("Update SanPham Error")
                    })
            }

        } catch (error) {

        }

    };

    const onChangesetDanhMuc = (value) => {
        setIsSuccess(true);
    }
    const onChangesetDanhmucid = (value) => {
        setDanhmucid(value);
        setIsSuccess(true);
    }
    const onChangesetName = (value) => {
        setIsSuccess(true);
        setName(value);
    }
    const onChangesetPrice = (value) => {
        setPrice(value);
        setIsSuccess(true);
    }
    const onChangesetDes = (value) => {
        setDescription(value);
        setIsSuccess(true);
    }
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
        setIsSuccess(true);
        setuploadIma(true);
    };
    const handleImageDelete = (indexToDelete) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(indexToDelete, 1);
        setuploadIma(true);
        try {
            ImageSV.DeleteHinhAnhInfo(listhinhanh[indexToDelete].id);
        } catch (error) {

        }

        setImagePreviews(updatedPreviews);
    };

    return (
        <div >
            <form className="row" onSubmit={updatesanpham}>
                <div className="col-lg-6 mt-5">
                    <div className="">
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Image</span>
                            <input type="file" class="form-control" multiple="5" onChange={handleFileChange} />
                        </div>

 
                         
                        <div className="mb-3">
                            {imagePreviews.map((preview, index) => (

                                <span className="image-preview justify-content-start">
                                    <img className="ms-4 image" key={index} src={preview} />
                                    <a className="delete-img-button " onClick={() => handleImageDelete(index)}><FaIcon icon={faTrashCan} /> </a>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="col-lg-6 mt-5">
                    <div className="">
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Danh Mục</span>
                            <select class="form-select" aria-label="" placeholder="ChonDanhMuc" onChange={(e) => onChangesetDanhmucid(e.target.value)} >
                                {danhmuc && <option selected value={danhmuc.id}>{danhmuc.name}</option>}
                                {listdanhmuc.map((item) => (
                                    <option value={item.id} >{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Name</span>
                            <input type="text" class="form-control" value={name} placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" onChange={(e) => onChangesetName(e.target.value)} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-25" id="basic-addon1">Price</span>
                            <input type="number" class="form-control" value={price} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => onChangesetPrice(e.target.value)} />
                        </div>

                        <div class="input-group">
                            <span class="input-group-text w-25">Description</span>
                            <textarea class="form-control" placeholder="Description" rows={10} value={Description} onChange={(e) => onChangesetDes(e.target.value)} aria-label="With textarea"></textarea>
                        </div>

                    </div>

                </div>
                {isSuccess && <button type="submit" className="btn btn-primary col-lg-6 offset-lg-3 mt-5 ">
                    Edit
                </button>}
            </form>
        </div>

    )


}

export default UpDatesanPham;