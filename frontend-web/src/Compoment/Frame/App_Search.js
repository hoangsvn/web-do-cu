import { faShoppingCart, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon   } from "@fortawesome/react-fontawesome";
import { SanPhamSV, ImageSV, TimeSV } from "../Services";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Fm_Product } from "../Fragments";


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
                }).catch(err =>{console.log(err)})
        } catch (error) {
        }
    }, [search]);

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
                    <Fm_Product  sanpham={sanpham} setedit={false} setdelete={false} />
                ))}
            </div>
        </div>
    );
}

export default SearchFrame;