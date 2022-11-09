import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_ITEMS_COUNT = 'cart/SET_ITEMS_COUNT',
  SET_TOTOAL_PRICE = 'cart/SET_TOTOAL_PRICE',
}

export type CARTITEM = CategoryItem & {
  quantity: number;
};
