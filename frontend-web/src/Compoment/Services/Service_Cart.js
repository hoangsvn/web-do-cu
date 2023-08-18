
import ApiInFo from "./Service_ApiInFo";
const API = ApiInFo.API

const AddToCart = (sid) => {
    
    return fetch(API + "/api/cart/addtocart/id=" + sid, ApiInFo.GET())
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Canot Delete id in Cart");
            }

        });
}

const DeleteToCart = (sid) => {
   

    return fetch(API + "/api/cart/deletetocart/id=" + sid, ApiInFo.GET())
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Canot Delete id in Cart");
            }

        });
}

const Cart = {
    DeleteToCart,
    AddToCart

}
export default Cart;