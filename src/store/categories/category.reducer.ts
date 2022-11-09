import { CATEGORIES_ACTION_TYPE, Category } from './category.types';
import {
  CategoryAction,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  FetchCategoriesFailed,
  fetchCategoriesFailed,
} from './category.action';
import { AnyAction } from 'redux';

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoryState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  return state;

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
  //     return { ...state, error: action.payload, isLoading: false };
  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
  //     return { ...state, categories: action.payload, isLoading: false };
  //   default:
  //     return state;
  // }
};
