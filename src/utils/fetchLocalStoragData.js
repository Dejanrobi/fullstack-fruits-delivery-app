export const fetchUser = () => {
  //fetching the user's info if the user is not equal to undefined
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

export const fetchCart = () => {
  //fetching the user's info if the user is not equal to undefined
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();

  //checking if cartInfo is present: we return the cart info
  //If not, we return an empty array

  return cartInfo ? cartInfo : [];
};

export const totalPrice = () => {
  const total =
    localStorage.getItem("total") !== "undefined"
      ? JSON.parse(localStorage.getItem("total"))
      : localStorage.clear();

  return total ? total : 0;
};
