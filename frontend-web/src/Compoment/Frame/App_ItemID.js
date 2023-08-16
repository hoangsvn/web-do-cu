
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthSV, ImageSV, SanPhamSV, CartSV, TimeSV } from '../Services';
import { toast } from 'react-toastify';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Fm_Owner } from '../Fragments';
 


const ItemID = () => {
    const { id } = useParams();
    const [sanpham, SetSanPham] = useState([]);
    const [listanh, SetListAnh] = useState([]);
 
    const [isok, SetOke] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        SanPhamSV.GetSanphambyID(id)
            .then((data) => {
                if (data.message.success) {
                    console.log("HERE");
                    SetSanPham(data.sanpham);
                    SetListAnh(data.sanpham.listhinhanh)
                    SetOke(true)
                } else {
                    toast.info(data.message.message);
                }
            }).catch(error => {
                toast.error("")
            })
    }, [id])



    const handlePrevClick = () => {
        console.log(listanh[currentIndex].link);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? listanh.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === listanh.length - 1 ? 0 : prevIndex + 1));
        console.log(listanh[currentIndex].link);
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

    const buyid =() =>{
         
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card shadow-sm w-100  mt-3'>
                    {isok && <div className='row'>
                        <div className='col-lg-6'>
                            <div className='card-header'> 
                                {listanh.length > 0 &&
                                    <div className='mt-4 me-4'>
                                        <div className='w-100 mb-2'>
                                            <button onClick={handlePrevClick} className="btn btn-sm  btn-outline-success ms-2 me-2">
                                                <FaIcon icon={faArrowLeftLong} />
                                            </button>
                                            <button className="btn btn-sm  btn-outline-success ms-2 me-2">
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

                            </div>
                            <div className='mt-4 card-body'>
                                <h5 className='fw-bold text-start'>Name : {sanpham.name} </h5>
                                <p className='text-danger text-start'>Price : {sanpham.price} VNĐ </p>
                                <p className='text-start'>Create : {TimeSV.timePassed(sanpham.create_at)} </p>
                                <p className='text-start lh-sm'>Desiption : {sanpham.desiption} </p>
                            </div>
                        </div>
                         
                        <div className='col-lg-6'>
                            <Fm_Owner uid={sanpham.user_id} />
                            {sanpham.state && <div className='mt-4'>
                                <button className="btn btn-sm w-100 btn-outline-success mt-2 " onClick={(e) => {buyid()}}> Buy </button> <br />
                                <button className="btn btn-sm w-100 btn-outline-success mt-2 " onClick={(e) => { btnaddsanphantocart(sanpham.id) }}> Add To Cart </button>
                            </div>}
                            {!sanpham.state && <div className='mt-4'>
                                <p>The product has been ordered by someone</p>
                            </div>}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );

}
export default ItemID;