
import {  useParams } from 'react-router-dom';


const ItemID = () => {
    const {id} = useParams(); 


    return (
        <div>
            <p>ID {id}</p>
        </div>
    );

}
export default ItemID;