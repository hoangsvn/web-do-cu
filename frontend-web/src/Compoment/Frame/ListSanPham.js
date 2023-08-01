import { useEffect, useState } from "react";
import { AuthSV, CartSV, SanPhamSV, TimeSV ,ImageSV } from "../Services";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDeleteLeft, faExclamationCircle, faPenSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ListCart = () => {

    const { path } = useParams();
    const [listcart, setListCart] = useState([]);
 
    const navigate = useNavigate();
    const [edit, SetEdit] = useState(false);
    const [deletecart, SetDeletcart] = useState(false);
    const [isok , SetOke] = useState(false);
    
    
    useEffect(() => {
        // try {
            AuthSV.ApiGetPath(path)
                .then((data) => {
                    if (data.message.success) {
                        setListCart(data.sanpham);
                        console.log(data.sanpham);
                        SetOke(true);
                    } else {
                        handleToast(data.message.message);
                    }
                }).catch(error => {
                    toast.error("Cannot get data in Back End");
                });

            if (path === "listcart") {
                SetDeletcart(true);
            } else if (path === "listsanpham") {
                SetDeletcart(false);
                SetEdit(true);
            }
        // } catch (error) {
        //     toast.error(error);
        // }
    }, []);

    const handleToast = (message) => {
        toast.info(message);
    };
    const handleDeleteItem = (id) => {
        setListCart((listcart) => listcart.filter((item) => item.id !== id));
      };

    const btnclicksanphan = (st, sid) => {
 
        console.log(sid);
        if (st === "deletetocart") {
            CartSV.DeleteToCart(sid)
                .then((data) => {
                    if (data.message.success) {
                        toast.success(data.message.message);
                        setTimeout(() => {handleDeleteItem(sid); }, 1000);
                    } else {

                        toast.info(data.message.message);
                    }
                }).catch((error) => {
                    toast.error(error);
                })

        } else if (st === "view") {
            navigate(`/sanpham/${sid}`);
        } else if (st === "update") {

        } else if (st === "deletesanpham") {

            SanPhamSV.DeleteSanPhamByID(sid)
                .then((data) => {
                    if (data.message.success) {
                        toast.success(data.message.message);
                        
                        setTimeout(() => {handleDeleteItem(sid); }, 1000);
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


    return (
        <div className="container mt-5">
            {edit && <div><button type="button" className="btn btn-sm w-100  btn-outline-success mt-2"><FaIcon icon={faAdd} /></button></div>  }
            <div className="">
                {isok && listcart.map((sanpham) => (
                    <div className="card shadow-sm w-100  mt-3">
                        <div className="row">
                            <div className="col-lg-3">
                                <img className="bd-placeholder-img card-img-top w-100 h-100" src={ImageSV.ImageUrlByLink(sanpham.listhinhanh[0]?.link)} onError={(e) => { e.target.src = '/imgerror.png'; }}></img>
                            </div>
                            <div className=" col-lg-8">
                                <p className=" text-start mt-4">Name : {sanpham.name}</p>
                                <p className=" text-start">Price : {sanpham.price}</p>
                                <p className=" text-start">Date : {TimeSV.formatDate(sanpham.create_at)}</p>
                            </div>
                            <div className=" col-lg-1">
                                <div className=" justify-content-between align-items-center ">
                                    <button type="button"   onClick={(e) => btnclicksanphan("view", sanpham.id)} className="btn btn-sm  btn-outline-info mt-4"> <FaIcon icon={faExclamationCircle} /></button> <br />
                                    {edit && <button type="button"   onClick={(e) => btnclicksanphan("update", sanpham.id)} className="btn btn-sm  btn-outline-success mt-2"><FaIcon icon={faPenSquare} /></button> } <br />
                                    {edit && <button type="button"   onClick={(e) => btnclicksanphan("deletesanpham", sanpham.id)} className="btn btn-sm  btn-outline-danger mt-2"><FaIcon icon={faTrashCan} /></button>} <br />
                                    {deletecart && <button type="button"  onClick={(e) => btnclicksanphan("deletetocart", sanpham.id)} className="btn btn-sm  btn-outline-danger mt-2 mb-4"><FaIcon icon={faTrashCan} /></button>} <br />

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
export default ListCart;