import { useEffect, useState } from "react";
import { AuthSV } from "../Services";
import { toast } from "react-toastify";

const ManagerUsers = () => {

    const [listUsers, setListUsers] = useState([]);
    const [keyword, setKeyWord] = useState('')
    useEffect(() => {
        try {
            AuthSV.getAllUsers()
                .then(data => {
                    if (data.message.success) {
                        setListUsers(data.userinfo);
                    } else {
                        toast.error(data.message.message);
                    }
                }).catch(err => {
                    console.log(err);
                });
        } catch (error) {

        }

        console.log(listUsers);
    }, [])


    const formSearch = (e) => {
        e.preventDefault();
        try {

            AuthSV.getSearchUsers(keyword)
                .then(data => {
                    if (data.message.success) {
                        setListUsers(data.userinfo);
                    } else {
                        toast.error(data.message.message);
                    }
                }).catch(err => {
                    console.log(err);
                });
        } catch (error) {

        }
    }
    return (
        <div className="col-lg-12">
            <div className="row">
                <form className="form" onSubmit={(e) => formSearch(e)} >
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
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((item) => (
                        <tr className="text-start">
                            <th scope="row">{item.id}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.roles.map((role) => (
                                <p>{role.name} :</p>
                            ))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ManagerUsers;