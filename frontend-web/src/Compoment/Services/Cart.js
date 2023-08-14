
import ApiInFo from "./ApiInFo";
const API = ApiInFo.API

const myHeaders =ApiInFo.myHeaders();


const AddToCart = (sid) => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(API + "/api/cart/addtocart/id=" + sid, requestOptions)
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            } else {
                throw new Error("Canot Delete id in Cart");
            }

        });
}

const DeleteToCart = (sid) => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(API + "/api/cart/deletetocart/id=" + sid, requestOptions)
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