import { createAction, withMatcher, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, CARTITEM } from './cart.types';
import { CategoryItem } from '../categories/category.types';
import CartItem from '../../components/cart-item/CartItem.component';

const addCartItem = (itemToAdd: CategoryItem, cartItems: CARTITEM[]): CARTITEM[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const deleteItem = (currentItem: CARTITEM, cartItems: CARTITEM[]): CARTITEM[] => {
  return cartItems.filter((item) => item.id !== currentItem.id);
};

const decItemQuantity = (currentItem: CARTITEM, cartItems: CARTITEM[]): CARTITEM[] => {
  if (currentItem && currentItem.quantity <= 1) return cartItems.filter((item) => item.id !== currentItem.id);
  else {
    return cartItems.map((item) => {
      if (item.id === currentItem.id) return { ...currentItem, quantity: currentItem.quantity - 1 };
      else return item;
    });
  }
};

// -----------------------------------------
export type setCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CARTITEM[]>;

export type setIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, Boolean>;

// ---------------------------------------------
export const setCartItems = withMatcher(
  (cartItems: CARTITEM[]): setCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const removeItemFromCheckout = (cartItems: CARTITEM[], currentItem: CARTITEM): setCartItems => {
  const NewCartItems = deleteItem(currentItem, cartItems);
  return setCartItems(NewCartItems);
};

export const decQuantity = (cartItems: CARTITEM[], currentItem: CARTITEM) => {
  const NewCartItems = decItemQuantity(currentItem, cartItems);
  return setCartItems(NewCartItems);
};

export const addItemToCart = (cartItems: CARTITEM[], itemToAdd: CategoryItem) => {
  const NewCartItems = addCartItem(itemToAdd, cartItems);
  return setCartItems(NewCartItems);
};

export const setIsCartOpen = withMatcher((Bool: Boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, Bool));
