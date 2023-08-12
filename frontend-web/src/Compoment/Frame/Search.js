import { faShoppingCart, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { SanPhamSV, ImageSV, TimeSV } from "../Services";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


const SearchFrame = () => {
    const { search } = useParams()
    const [listsanpham, setlistsanpham] = useState([]);

    const navigate = useNavigate();

    const [isok, SetOke] = useState(false);


    useEffect(() => {
        try {
            console.log(search);
            SanPhamSV.Search(search)
                .then(data => {

                    if (data.message.success) {
                        setlistsanpham(data.sanpham);
                        SetOke(true);
                    } else {
                        toast.info(data.message.message);
                    }
                })
        } catch (error) {
        }
    }, []);




    const btnclicksanphan = (st, sid) => {


        if (st === "view") {
            navigate(`/sanpham/${sid}`);
        } else if (st === "addtocard") {

        } else {

        }
    }



    return (
        <div className="container mt-5">

            <div className="">
                <div className="h-4" > {listsanpham.length > 0 ? "Có tất cả " + listsanpham.length + " phù hợp" : "Không có sản phẩn nào phù hợp "}  </div>
                {isok && listsanpham.map((sanpham) => (
                    <div className="card shadow-sm w-100  mt-3">
                        <div className="row">
                            <div className="col-lg-3">
                                <img className="bd-placeholder-img card-img-top w-100 h-100" src={ImageSV.ImageUrlByLink(sanpham.listhinhanh[0]?.link)} onError={(e) => { e.target.src = '/imgerror.png'; }}></img>
                            </div>
                            <div className=" col-lg-8">
                                <p className=" text-start mt-4">Name : {sanpham.name}</p>
                                <p className=" text-start">Price : {sanpham.price}</p>
                                <p className=" text-start">Date : {TimeSV.formatDate(sanpham.create_at)}</p>
                                {sanpham.listdanhmuc.length > 0 && <p className=" text-start">Danh Mục : {sanpham.listdanhmuc[0].name}</p>}
                            </div>
                            <div className=" col-lg-1">
                                <div className=" justify-content-between align-items-center ">
                                    <button type="button" onClick={(e) => btnclicksanphan("view", sanpham.id)} className="btn btn-sm  btn-outline-info mt-4"> <FaIcon icon={faExclamationCircle} /></button> <br />
                                    <button type="button" onClick={(e) => btnclicksanphan("addtocard", sanpham.id)} className="btn btn-sm  btn-outline-info mt-2 mb-4"><FaIcon icon={faShoppingCart} /></button> <br />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchFrame;