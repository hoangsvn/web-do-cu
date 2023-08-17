import { useEffect, useState } from "react";
import { CartSV, ImageSV, SanPhamSV ,TimeSV} from "../Services";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
   
    const [top20, setTop20] = useState([]);
    const [isok , SetOk] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        
        SanPhamSV.GetTop20Sanpham().then(data =>{
            setTop20(data);
            console.log(data);
            SetOk(true);
        })
        .catch((error) => {
            toast.error("Cannot get data in BackEnd ");
        });

    }, [location]);


    
    const btntosanphan = (sid) =>{
        
        navigate(`/sanpham/${sid}`);
    }
    const btnaddsanphantocart = (sid) =>{
        
        try {
            CartSV.AddToCart(sid)
                .then(data => {
                    if (data.message.success){
                        toast.success(data.message.message);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch(err => console.log(err));
        } catch (error) {
            
        }
    }


    return (
        
        <div className="container mt-5">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                { isok && top20.map((sanpham) => (
                    <div class="col">
                        <div class="card shadow-sm">
                            <div>
                                <img class="bd-placeholder-img card-img-top w-100" height="225" src={ImageSV.ImageUrlByLink(sanpham.listhinhanh[0]?.link)} onError={(e) => {e.target.src = '/imgerror.png'; }}></img>
                            </div>
                            <div class="card-body">
                                <p class="card-text text-start">{"Name  :" + sanpham.name}</p>
                                <p class="card-text text-start">{"Price :" + sanpham.price + " VND"}</p>
                                <p class="card-text text-start">{"Date  :" + TimeSV.timePassed(sanpham.create_at)}</p>
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group w-100">
                                        <button type="button "  class="btn btn-sm btn-outline-info" onClick={(e) => btntosanphan(sanpham.id)}><FontAwesomeIcon icon={faExclamationCircle} /></button>
                                        <button type="button"   class="btn btn-sm btn-outline-primary" onClick={(e) => btnaddsanphantocart(sanpham.id)}><FontAwesomeIcon icon={faShoppingCart} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Home;