import { useEffect, useState } from "react";
import { ImageSV } from "../Services";

const From_LiteProduct = ({ sanpham }) => {
    const [listanh,setListAnh] = useState([]);
    useEffect(()=>{
       try {
            setListAnh(Array.from(sanpham.listhinhanh));
       } catch (error) {
        
       }
    },[sanpham]);
    return (
        <div className="card d-flex" >
            <div className="card-header row">
                <div className="col-lg-4  text-start">
                {listanh.length >0 ? 
                    <img className="bd-placeholder-img card-img-top" src={ImageSV.ImageUrlByLink(listanh[0].link)} onError={(e) => { e.target.src = '/imgerror.png'; }} /> :
                    <img className="bd-placeholder-img card-img-top" src={"/imgerror.png"}  /> 
                }
                </div>
                <div className="col-lg-6  text-start">
                    <h6 >Name : {sanpham.name} </h6>
                    <h6 className="text-danger" >Price : {sanpham.price} </h6>
                </div>
            </div>
        </div>
    );
}
export default From_LiteProduct;