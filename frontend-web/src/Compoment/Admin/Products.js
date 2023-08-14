import { useEffect, useState } from "react";
import { AuthSV, SanPhamSV, TimeSV } from "../Services";
import { toast } from "react-toastify";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ManagerProducts = () => {


    const [listproducts, setListProDucts] = useState([]);
    const usenavigate = useNavigate();
    const [keyword, setKeyWord] = useState('')
    const IniT = () => {
        try {
            SanPhamSV.getAllSanPham()
                .then(data => {
                    if (data.message.success) {
                        setListProDucts(data.sanpham);
                    } else {
                        toast.info(data.message.message);
                    }

                }).catch(err => {
                    toast.error("Canot get All User");
                })
        } catch (error) {

        }
    }

    useEffect(() => {
        IniT();
    }, [])

    const onChangeproductinfo = (id) => {
        usenavigate("/sanpham/" + id)
    }

    const productsSearch = (e) => {
        e.preventDefault();
        try {
            SanPhamSV.Search(keyword)
                .then(data => {
                    if (data.message.success) {
                        setListProDucts(data.sanpham);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch(err =>{console.log(err)});
        } catch (error) {
            
        }
    }
    return (
        <div className="col-lg-12">
            <div className="row">
                <form className="form" onSubmit={(e)=>productsSearch(e)} >
                    <div className="input-group mt-1 mb-3">
                        <input type="text" className="form-control w-50" placeholder="Search" aria-label="Search" onChange={(e) => setKeyWord(e.target.value)} />
                        <button className="input-group-text" type="submit"> Search </button>
                    </div>
                </form>
            </div>
            <table class="table">
                <thead>
                    <tr className="text-start">
                        <th scope="col">#ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Create</th>
                        <th scope="col">Count Image</th>
                        <th scope="col">Tool</th>
                    </tr>
                </thead>
                <tbody>
                    {listproducts.map((item) => (
                        <tr className="text-start">
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{TimeSV.formatDate(item.create_at)}</td>
                            <td>{item.listhinhanh.length}</td>
                            <td><FaIcon className="btn" icon={faEdit} /> : <FaIcon className="btn" onClick={() => onChangeproductinfo(item.id)} icon={faInfo} /> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ManagerProducts;