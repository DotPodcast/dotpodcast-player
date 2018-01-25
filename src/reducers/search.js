import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'SEARCH_REQUESTED',
  'SEARCH_FETCH_SUCCEEDED',
  'SEARCH_FETCH_FAILED',
]);

export const actions = {
  updateQuery: (text) => {
    return {
      type: types.SEARCH_REQUESTED,
      text
    };
  },
  searchSuccess: (results) => {
    return {
      type: types.SEARCH_FETCH_SUCCEEDED,
      results
    };
  },
  searchFail: (error) => {
    return {
      type: types.SEARCH_FETCH_FAILED,
      error
    };
  }
};

const defaultState = {
  text: '',
  searching: false,
  error: null,
  results: {
    total: 0,
    hits: []
  },
};

const search = (state = defaultState, action) => {
  switch (action.type) {
    case types.SEARCH_REQUESTED:
      return {
        ...state,
        text: action.text,
        searching: true,
      };
    case types.SEARCH_FETCH_SUCCEEDED:
      return {
        ...state,
        searching: false,
        results: {
          total: action.results.total,
          hits: action.results.hits
        }
      }
    case types.SEARCH_FETCH_FAILED:
      return {
        ...state,
        searching: false,
        error: action.error,
      }
    default:
      return state;
  }
};

export default search;
