const initialState = {
  cartItems: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.id !== action.payload.id || item.color !== action.payload.color
        )
      };
    case 'CHANGE_COUNT':
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id === action.payload.id && item.color === action.payload.color) {
            return {
              ...item,
              count: action.payload.count
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
};
