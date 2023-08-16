import { useCallback, useEffect, useState } from "react";
import { AuthSV, CartSV, SanPhamSV, TimeSV, ImageSV } from "../Services";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd  } from "@fortawesome/free-solid-svg-icons";
import { Fm_Product } from "../Fragments";

const ListCart = () => {

    const { path } = useParams();
    const [listcart, setListCart] = useState([]);
    const navigate = useNavigate();
    const [edit, SetEdit] = useState(false);
    const [deletecart, SetDeletcart] = useState(false);
    const [isok, SetOke] = useState(false);


    useEffect(() => {
     
        AuthSV.ApiGetPath(path)
            .then((data) => {
                if (data.message.success) {
                    setListCart(data.sanpham);
                    SetOke(true);
                } else {
                    toast.info(data.message.message);
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

    }, [path]);

    const handleDeleteItem = (id) => {
        setListCart((listcart) => listcart.filter((item) => item.id !== id));
    };

    const btnAddsanpham = () => {
        navigate("/add");
    }



    return (
        <div className="container mt-5">
            {edit && <div><button type="button" className="btn btn-sm w-100  btn-outline-success mt-2" onClick={btnAddsanpham}><FontAwesomeIcon icon={faAdd} /></button></div>}
            <div className="">
                {isok && listcart.map((sanpham) => (
                    <div>
                        <Fm_Product sanpham={sanpham} setedit={edit} setdelete={deletecart} onSanPhamDelete={handleDeleteItem} />
                    </div>
                ))}
            </div>
        </div>
    );

}
export default ListCart;