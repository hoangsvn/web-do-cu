import { useEffect, useState } from "react";
import { SanPhamSV ,TimeSV} from "../Services";

import { toast } from "react-toastify";

const Home = () => {

    const imgurl = "http://localhost/api/image/link=";

    const [top20, setTop20] = useState([]);


    const Init = async () => {
        var list = await SanPhamSV.GetTop20Sanpham()
            .catch((error) => {
                toast.error("Error " + error);
            });
        setTop20(list);
    };

    useEffect(() => {
        Init();
    }, []);


    console.log(top20);
    return (

        <div className="container mt-5">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {top20.map((sanpham) => (
                    <div class="col">
                        <div class="card shadow-sm">
                            {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225"  role="img" aria-label="ERROR" preserveAspectRatio="xMidYMid slice" focusable="false"></svg> */}
                            <div>
                                <img class="bd-placeholder-img card-img-top w-100" height="225"
                                    src={imgurl + sanpham.listhinhanh[0]?.link} onError={(e) => {
                                        e.target.src = 'imgerror.png';
                                    }}></img>
                            </div>
                            <div class="card-body">
                                <p class="card-text text-start">{"Name  :" + sanpham.name}</p>
                                <p class="card-text text-start">{"Price :" + sanpham.price + " VND"}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group w-50">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Cart</button>
                                    </div>
                                    <small class="text-muted">{TimeSV.timePassed(sanpham.create_at)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225"  role="img" aria-label="ERROR" preserveAspectRatio="xMidYMid slice" focusable="false"></svg>
                        <div>
                            <img class="bd-placeholder-img card-img-top w-100" height="225" src="http://localhost/api/image/link=Hoang1456789" onError={(e) => {
                                e.target.src = 'imgerror.png';
                            }}></img>
                        </div>
                        <div class="card-body">
                            <p class="card-text">0</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group w-50">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Cart</button>
                                </div>
                                <small class="text-muted">2</small>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Home;