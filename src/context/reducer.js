//creating the actionType(what type of actionType we are going to do)
export const actionType = {
  //action type user
  //want to update user, we will call SET_USER then dispatch the updated value to that action type
  //we are creating a data layer that will be on top of the entire component
  //that layer will be accessible for all the child components whenever needed
  //incase of any changes, we then push to the data layer where we will have the updated information
  //hence we do not need to pass the state incase of multiple child components
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_TOTAL: "SET_TOTAL",
};

//creating the reducer, takes the state and the action that we are going to do
const reducer = (state, action) => {
  //we are seeing what kind of action is triggering
  // console.log(action);
  //when dispatching, we will pass the actio type
  switch (action.type) {
    //if actionType = SET USER, then use this case
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
        //we spread the state values and set the user: to action.user
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
        //we spread the state values and set the user: to action.user
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
        //we spread the state values and set the user: to action.user
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
        //we spread the state values and set the user: to action.user
      };

    case actionType.SET_TOTAL:
      return {
        ...state,
        total: action.total,
        //we spread the state values and set the user: to action.user
      };

    default:
      return state;
  }
};

//exporting our reducer function
export default reducer;
//the reducer is not still re-usable hence we need to wrap it in our top-level variable i.e Index.js
