import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'USER_LOGIN_CALLBACK',
  'USER_DETAILS_LOADED',
  'USER_DETAILS_FAILED',
  'USER_BYPASSED_LOGIN'
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
  bypassedLogin: () => {
    return {
      type: types.USER_BYPASSED_LOGIN,
    }
  }
};

const defaultState = {
  anonymous: false,
  loadingUser: false,
  appPrivateKey: '',
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
      };
    case types.USER_DETAILS_FAILED:
      return {
        ...state,
        loadingUser: false,
        error: action.error,
      };
    case types.USER_BYPASSED_LOGIN:
      return {
        ...state,
        anonymous: true,
        loadingUser: false,
        error: null
      }
    default:
      return state;
  }
};

export default reducer;
