import {
  fetchCart,
  fetchUser,
  totalPrice,
} from "../utils/fetchLocalStoragData";

//Fetching the user
const userInfo = fetchUser();

const cartInfo = fetchCart();
//we define the initialState of our user

const totalP = totalPrice();
export const initialState = {
  //initially, the user State is null
  //setting user to userinfor
  user: userInfo,
  //initial State of food items
  foodItems: null,

  cartShow: false,
  //everytime the user Refreshes, it should show the CartItems
  cartItems: cartInfo,
  total: totalP,
};
