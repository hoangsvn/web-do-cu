import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageSV, SanPhamSV, TimeSV, CartSV } from "../Services";
import { useNavigate } from "react-router-dom";
import { faExclamationCircle, faPenSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
 

const Fm_Product = ({ sanpham, setedit, setdelete ,onSanPhamDelete }) => {
    const navigate = useNavigate();
    
    const btnclicksanphan = (st, sid) => {
        if (st === "deletetocart") {
            CartSV.DeleteToCart(sid)
                .then((data) => {
                    if (data.message.success) {
                        toast.success(data.message.message);
                        setTimeout(() => { handleDeleteItem(sid); }, 1000);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch((error) => {
                    toast.error(error);
                })

        } else if (st === "view") {
            navigate(`/sanpham/${sid}`);
        } else if (st === "update") {
            navigate(`/edit/${sid}`)
        } else if (st === "deletesanpham") {
            SanPhamSV.DeleteSanPhamByID(sid)
                .then((data) => {
                    if (data.message.success) {
                        toast.success(data.message.message);
                        setTimeout(() => { handleDeleteItem(sid); }, 1000);
                    } else {
                        toast.info(data.message.message);
                    }
                })
                .catch((error) => {
                    toast.error(error);
                })
        } else {

        }
    }
    const handleDeleteItem = (sid) => {
        onSanPhamDelete(sid)
    };
    return (
        <div className="card shadow-sm mt-3">
            <div className="row">
                <div className="col-lg-3">
                    <img className="bd-placeholder-img card-img-top w-100 h-100" src={ImageSV.ImageUrlByLink(sanpham.listhinhanh[0]?.link)} onError={(e) => { e.target.src = '/imgerror.png'; }}></img>
                </div>
                <div className="col-lg-8">
                    <p className=" text-start mt-4">Name : {sanpham.name}</p>
                    <p className=" text-start">Price : {sanpham.price}</p>
                    <p className=" text-start">Date : {TimeSV.formatDate(sanpham.create_at)}</p>
                    { !sanpham.state && <p> The product has been ordered by someone </p> }
                </div>
                <div className=" col-lg-1">
                    <div className=" justify-content-between align-items-center ">
                        <button type="button" onClick={(e) => btnclicksanphan("view", sanpham.id)} className="btn btn-sm  btn-outline-info mt-4"> <FontAwesomeIcon icon={faExclamationCircle} /></button> <br />
                        {sanpham.state && setedit && <button type="button" onClick={(e) => btnclicksanphan("update", sanpham.id)} className="btn btn-sm  btn-outline-success mt-2"><FontAwesomeIcon icon={faPenSquare} /></button>} <br />
                        {sanpham.state && setedit && <button type="button" onClick={(e) => btnclicksanphan("deletesanpham", sanpham.id)} className="btn btn-sm  btn-outline-danger mt-2"><FontAwesomeIcon icon={faTrashCan} /></button>} <br />
                        { setdelete && <button type="button" onClick={(e) => btnclicksanphan("deletetocart", sanpham.id)} className="btn btn-sm  btn-outline-danger mt-2 mb-4"><FontAwesomeIcon icon={faTrashCan} /></button>} <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Fm_Product;