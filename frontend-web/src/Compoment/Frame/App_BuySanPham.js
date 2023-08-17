import { useEffect, useState } from "react";
import { SanPhamSV } from "../Services";
import { useParams } from "react-router-dom";
import { Fm_LiteProduct, Fm_Owner } from "../Fragments";
import { toast } from "react-toastify";

const App_BuySanPham = () => {


    const { sid } = useParams();
    const [sanpham, setSanPham] = useState([]);
    const [isoke, SetOke] = useState(false);

    useEffect(() => {
        try {
            SanPhamSV.GetSanphambyID(sid)
                .then(data => {
                    if (data.message.success) {
                        SetOke(data.sanpham.state);
                        
                        setSanPham(data.sanpham);
                    }
                })

        } catch (error) {
            console.log(error);
        };
    }, [sid])

    const buy =()=>{
        console.log(sid);
        try {
            SanPhamSV.BuySanPhamID(sid)
                .then(data =>{
                    
                    if(data.message.success){
                        toast.success(data.message.message);
                    } else {
                        toast.info(data.message.message);
                    }
                }) .catch(err=>{
                    toast.error("Buy Product iD ERROR");
                })
        } catch (error) {
            toast.error("Buy Product iD ERROR");
        }
    }

    return (
        <div className="row col-lg-8 offset-2">
            {isoke && 
                <div className="">
                    <div  className="card">
                        <h2 className="card-header" > Product </h2>
                        <div className="col-lg-12 d-flex card-body">
                            <Fm_LiteProduct sanpham={sanpham} />
                            <Fm_Owner uid={sanpham.user_id} />
                        </div>
                        <div className="col-lg-12 card-footer">
                            <h2 className=""> Price  : {sanpham.price}</h2>
                            <button onClick={buy} className="btn btn-outline-success w-100">Buy</button>
                        </div>
                    </div>
                </div>
            }
            {!isoke && 
                <div className="card"> 
                    <div className="card-header">
                        <h2> The product has been ordered by someone </h2>
                    </div>
                </div>
            }
        </div>
    );
}
export default App_BuySanPham;