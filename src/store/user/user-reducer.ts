import { USER_ACTION_TYPES } from './user.types';
import { UserData } from '../../utils/firebase/firebase.utils';
import { AnyAction } from 'redux';

import { signInSuccess, signInFailed, signUpFailed, signOutSuccess, signOutFailed } from './user.action';

export type UserState = {
  readonly currentUser: null | UserData;
  readonly isLoading: Boolean;
  readonly error: null | Error;
};

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};
export const userReducer = (state: UserState = INITIAL_STATE, action: AnyAction): UserState => {
  if (signInSuccess.match(action))
    return {
      ...state,
      currentUser: action.payload,
    };

  if (signOutSuccess.match(action)) return { ...state, currentUser: null };

  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action))
    return { ...state, error: action.payload };

  return state;
};
