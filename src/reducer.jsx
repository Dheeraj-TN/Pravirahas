/* eslint-disable no-case-declarations */
export const initialState = {
  basket: [],
  user: null,
  selectedSubCategory: "",
  modalOpen: "",
  selectedFilter: "",
  selectedFilterMobile: "",
};

export const getBasketTotal = (basket) =>
  //adding the price and increasing the amount which is initally 0
  basket?.reduce((amount, item) => parseInt(item.price) + amount, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    //saveStateToLocalStorage(updatedState)
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id:${action.id})
                as it is not in the basket!!`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SELECTED_SUBCAT_ITEM":
      return {
        ...state,
        selectedSubCategory: action.selectedSubCategory,
      };
    case "SELECTED_FILTER":
      return {
        ...state,
        selectedFilter: action.selectedFilter,
      };
    case "SELECTED_FILTER_MOBILE":
      return {
        ...state,
        selectedFilterMobile: action.selectedFilterMobile,
      };
    case "OPEN_PRODUCT_MODAL":
      return {
        ...state,
        modalOpen: action.modalOpen,
      };
    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
export default reducer;
