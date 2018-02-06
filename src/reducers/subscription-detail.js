import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'SUBSCRIPTION_REQUESTED_BY_ID',
  'SUBSCRIPTION_REQUESTED_BY_URL',
  'SUBSCRIPTION_RETRIEVED',
  'SUBSCRIPTION_ERROR'
]);

export const actions = {
  detailRequestedByID: (id) => {
    return {
      type: types.SUBSCRIPTION_REQUESTED_BY_ID,
      id
    }
  },
  detailRequestedByURL: (url) => {
    return {
      type: types.SUBSCRIPTION_REQUESTED_BY_URL,
      url
    }
  },
  detailRetrieved: (subscription) => {
    return {
      type: types.SUBSCRIPTION_RETRIEVED,
      subscription
    };
  },
  detailError: (error) => {
    return {
      type: types.SUBSCRIPTION_ERROR,
      error
    }
  }
}

const defaultState = {
  subscription: null,
  requesting: false,
  requested: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SUBSCRIPTION_REQUESTED:
      return {
        ...state,
        requesting: true,
        requested: false
      };
    case types.SUBSCRIPTION_RETRIEVED:
      return {
        ...state,
        requesting: false,
        requested: true,
        subscription: action.subscription
      };
    case types.SUBSCRIPTION_ERROR:
      return {
        ...state,
        requesting: false,
        requested: true,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
