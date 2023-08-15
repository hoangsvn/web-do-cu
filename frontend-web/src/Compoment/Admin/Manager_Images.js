import { useEffect, useState } from "react";
import { ImageSV } from "../Services";
import { toast } from "react-toastify";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
 
const Images = () => {

    const [listimages, setListImages] = useState([]);
 
    const IniT = (e) => {
        e.preventDefault();
        try {
            ImageSV.getAllLink()
                .then((data) => {
                    if (data.message.success) {
                        setListImages(data.image);
                    } else {
                        toast.info(data.message.message);
                    }
                }).catch((err) => console.log(err));
        } catch (error) {

        }
    }

    useEffect(() => {

    }, [])


    const onChangeImageLink =(link) =>{
        window.open(ImageSV.ImageUrlByLink(link), '_blank').focus();
         
    }

    return (
        <div className="col-lg-12">
            <div className="w-100  d-flex text-start ">
                <h3 className="col-lg-10"> List Images </h3>
                <button className="col-lg-2 btn btn-sm" onClick={(e) => IniT(e)} >Load</button>
            </div>
            <table class="table">
                <thead>
                    <tr className="text-start">
                        <th scope="col">#ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Tool</th>
                    </tr>
                </thead>
                <tbody>
                    {listimages.map((item) => (
                        <tr className="text-start">
                            <th scope="row">{}</th>
                            <td>{item}</td>
                            <td><FaIcon icon={faImage} onClick={() => onChangeImageLink(item) }/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Images;