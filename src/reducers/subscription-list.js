import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'LIST_REQUESTED',
  'LIST_RETRIEVED',
  'LIST_ERROR'
]);

export const actions = {
  listRequested: (userID) => {
    return {
      type: types.LIST_REQUESTED,
      userID
    }
  },
  listRetrieved: (results) => {
    return {
      type: types.LIST_RETRIEVED,
      results
    };
  },
  listError: (error) => {
    return {
      type: types.LIST_ERROR,
      error
    }
  }
}

const defaultState = {
  podcasts: null,
  paginator: null,
  requesting: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LIST_REQUESTED:
      return {
        ...state,
        requesting: true
      };
    case types.LIST_RETRIEVED:
      return {
        ...state,
        requesting: false,
        podcasts: action.results.items,
        paginator: action.results.meta
      };
    case types.LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
