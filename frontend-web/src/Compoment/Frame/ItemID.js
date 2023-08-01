
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthSV, ImageSV, SanPhamSV, CartSV, TimeSV } from '../Services';
import { toast } from 'react-toastify';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';


const ItemID = () => {
    const { id } = useParams();
    const [sanpham, SetSanPham] = useState([]);
    const [listanh, SetListAnh] = useState([]);
    const [user, SetUser] = useState([]);
    const [isok, SetOke] = useState(false);
    const [isuser, SetUserOk] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        SanPhamSV.GetSanphambyID(id)
            .then((data) => {
                if (data.message.success) {
                    SetSanPham(data.sanpham);
                    console.log(data);
                    SetListAnh(data.sanpham.listhinhanh)
                    console.log(data.listhinhanh);
                    SetOke(true)
                    console.log(data.sanpham.user_id);
                    AuthSV.ApiGetUserInfoPublic(data.sanpham.user_id)
                        .then(udata => {
                            if (udata.message.message) {
                                SetUser(udata.userinfo);
                                SetUserOk(true);
                            } else {
                                toast.info("Cannot get User PubLic Info");
                            }
                        }).catch((err) => {
                            toast.info("Error get User PubLic Info");
                        })

                } else {
                    toast.info(data.message.message);
                }
            }).catch(error => {
                toast.error("")
            })
    }, [])



    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? listanh.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === listanh.length - 1 ? 0 : prevIndex + 1));
    };
    const btnaddsanphantocart = (sid) => {

        try {
            CartSV.AddToCart(sid)
                .then(data => {
                    if (data.message.success) {
                        toast.success(data.message.message);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch(err => console.log(err));
        } catch (error) {

        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card shadow-sm w-100  mt-3'>
                    {isok && <div className='row'>
                        <div className='col-lg-6'>
                            {listanh.length > 0 &&
                                <div className='mt-4 me-4'>
                                     <div className='w-100 mb-2'>
                                        <button onClick={handlePrevClick} className="btn btn-sm  btn-outline-success ms-2 me-2">
                                            <FaIcon icon={faArrowLeftLong} />
                                        </button>
                                        <button  className="btn btn-sm  btn-outline-success ms-2 me-2">
                                            {`${currentIndex + 1}/${listanh.length}`}
                                        </button>
                                        <button onClick={handleNextClick} className="btn btn-sm  btn-outline-success ms-2 me-2">
                                            <FaIcon icon={faArrowRightLong} />
                                        </button>
                                    </div>
                                    <img className='w-100' src={ImageSV.ImageUrlByLink(listanh[currentIndex].link)} onError={(e) => { e.target.src = '/imgerror.png'; }}></img>
                                   
                                </div>}
                            {listanh.length === 0 &&
                                <div className='mt-4 me-4'>
                                    <img className='w-100' src='/imgerror.png'></img>
                                </div>}
                            <div className='mt-4'>
                                <h5 className='fw-bold text-start'>Name : {sanpham.name} </h5>
                                <p className='text-danger text-start'>Price : {sanpham.price} VNĐ </p>
                                <p className='text-start'>Create : {TimeSV.timePassed(sanpham.create_at)} </p>
                                <p className='text-start lh-sm'>Desiption : {sanpham.desiption} </p>
                            </div>
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-5'>
                            {isuser && <div className="card-body text-center row"  >
                                <img src="/useravata.png" alt="avatar" class="rounded-circle img-fluid h-50 col-lg-4" />
                                <div className='col-lg-8'>
                                    <h4 className='text-start'> Owner </h4>
                                    <h4 className="text-start my-3">{user.fullname}</h4>
                                    <p className="text-muted text-start mb-1">{user.email}</p>
                                    <p className="text-muted text-start mb-4">{user.listdiachi > 0 && user.listdiachi[0]?.huyen}</p>
                                </div>
                            </div>}
                            <div>
                                <button className="btn btn-sm w-100 btn-outline-success mt-2 ms-2"> Buy </button> <br />
                                <button className="btn btn-sm w-100 btn-outline-success mt-2 ms-2" onClick={(e) => { btnaddsanphantocart(sanpham.id) }}> Add To Cart </button>


                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );

}
export default ItemID;