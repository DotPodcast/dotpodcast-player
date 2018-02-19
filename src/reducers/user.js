import makeTypes from '../utils/makeTypes';
import { decodeToken } from 'jsontokens'

export const types = makeTypes([
  'USER_LOGIN_CALLBACK',
  'USER_DETAILS_LOADED',
  'USER_DETAILS_FAILED',
]);

export const actions = {
  handleLoginCallback: () => {
    return {
      type: types.USER_LOGIN_CALLBACK,
    };
  },
  loadUserDetails: (data) => {
    return {
      type: types.USER_DETAILS_LOADED,
      data,
    };
  },
  failedUserDetails: (error) => {
    return {
      type: types.USER_DETAILS_FAILED,
      error,
    };
  },
};

const defaultState = {
  loadingUser: false,
  appPrivateKey: '',
  publicKey: '',
  authResponseToken: '',
  hubUrl: '',
  coreSessionToken: null,
  profile: null,
  error: null,
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case types.USER_LOGIN_CALLBACK:
      return {
        ...state,
        loadingUser: true,
      };
    case types.USER_DETAILS_LOADED:
      return {
        ...state,
        loadingUser: false,
        ...action.data,
        publicKey: decodeToken(action.data.authResponseToken).payload.public_keys[0]
      };
    case types.USER_DETAILS_FAILED:
      return {
        ...state,
        loadingUser: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
