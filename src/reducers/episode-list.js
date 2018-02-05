import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'EPISODES_REQUESTED',
  'EPISODES_RETRIEVED',
  'EPISODES_ERROR'
]);

export const actions = {
  listRequested: (url) => {
    return {
      type: types.EPISODES_REQUESTED,
      url
    }
  },
  listRetrieved: (results) => {
    return {
      type: types.EPISODES_RETRIEVED,
      results
    };
  },
  listError: (error) => {
    return {
      type: types.EPISODES_ERROR,
      error
    }
  }
}

const defaultState = {
  episodes: null,
  paginator: null,
  requesting: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.EPISODES_REQUESTED:
      return {
        ...state,
        requesting: true
      };
    case types.EPISODES_RETRIEVED:
      return {
        ...state,
        requesting: false,
        episodes: action.results.items,
        paginator: action.results.meta
      };
    case types.EPISODES_ERROR:
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
