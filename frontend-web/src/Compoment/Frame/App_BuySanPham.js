import { useEffect, useState } from "react";
import { SanPhamSV } from "../Services";
import { useParams } from "react-router-dom";
import { Fm_LiteProduct } from "../Fragments";

const App_BuySanPham = () => {


    const { sid } = useParams();
    const [sanpham, setSanPham] = useState([]);


    useEffect(() => {
         
        try {
            SanPhamSV.GetSanphambyID(sid)
                .then(data => {
                    if (data.message.success) {
                        console.log(data.sanpham);
                        setSanPham(data.sanpham);
                    }
                })

        } catch (error) {
            console.log(error);
        };
    }, [sid])
    return (
        <div>
            <div className="col-lg-6 offset-3">
                <h2>List ProDuct </h2>
                <Fm_LiteProduct sanpham={sanpham} />
            </div>
            <div className="col-lg-6 offset-3 mt-2">
                <button className="btn btn-outline-success w-100" >Buy</button>
            </div>
        </div>
    );
}
export default App_BuySanPham;