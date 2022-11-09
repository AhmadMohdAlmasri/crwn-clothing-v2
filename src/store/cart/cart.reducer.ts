import { CARTITEM } from './cart.types';
import { setCartItems, setIsCartOpen } from './cart.action';
import { AnyAction } from 'redux';
export type CartState = {
  readonly cartItems: CARTITEM[];
  readonly isCartOpen: Boolean;
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setCartItems.match(action))
    return {
      ...state,
      cartItems: action.payload,
    };
  if (setIsCartOpen.match(action))
    return {
      ...state,
      isCartOpen: action.payload,
    };

  return state;
};
