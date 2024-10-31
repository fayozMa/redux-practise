const defaultState = {
  cart: [],
};

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case "DELETE": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};
