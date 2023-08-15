import { useEffect, useState } from "react";
import { DanhMucSV } from "../Services";
import { toast } from "react-toastify";

const ManagerCategorys = () => {

    const [listcategory, setCategory] = useState([]);
    const [addBtn, SetAddBtn] = useState(true);
    const [newCategory, SetNewCategory] = useState();
    
    const Init =() =>{
        try {
            DanhMucSV.GetAll()
                .then(data => {
                    if (data.message.success) {
                        setCategory(data.danhmuc);
                    }
                    console.log(listcategory.length);
                }).catch(() => {
                    toast.error("Fail get Category")
                })
        } catch (error) {

        }
    }
    useEffect(() => {
        Init();
    }, []);

    const addCategory =(e)=>{
        e.preventDefault();
        try {
            DanhMucSV.AddNewCategory(newCategory)
            .then(data => {
                if (data.message.success){
                    toast.success(data.message.message);
                    Init();
                } else {
                    toast.info(data.message.message);
                }
            }) .catch((er)=>{
                toast.error("Error Add New Category");
            })
        } catch (s) {
            
        }
    }
    const onChangeBtnAddActive = () => {
        console.log(addBtn);
        SetAddBtn(false)
    }
    return (
        <div>
            <div className="col-lg-12">
                <table class="table">
                    <thead>
                        <tr className="text-start">
                            <th scope="col">#ID</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listcategory.map((item) => (
                            <tr className="text-start">
                                <th className="w-25" scope="row">{item.id}</th>
                                <td className="w-75">{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {addBtn && (
                    <div className="card">
                        <button className="btn card-body" onClick={onChangeBtnAddActive}> Add Category </button>
                    </div>
                )}
                {!addBtn && (
                    <div className="card">
                        <form className="form " onSubmit={(e) =>addCategory(e)}>
                            <div className="input-group mt-1 mb-3">
                                <span className="input-group-text w-25" id="basic-addon1">Category</span>
                                <input type="text" className="form-control w-50" placeholder="Example" aria-label="Example" onChange={ (e) =>SetNewCategory(e.target.value)}  />
                                <button className="input-group-text" type="submit"> Add </button>
                            </div>
                            
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ManagerCategorys;