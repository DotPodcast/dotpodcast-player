import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'DETAIL_REQUESTED',
  'DETAIL_RETRIEVED',
  'DETAIL_ERROR'
]);

export const actions = {
  detailRequested: (slug) => {
    return {
      type: types.DETAIL_REQUESTED,
      slug
    }
  },
  detailRetrieved: (metadata) => {
    return {
      type: types.DETAIL_RETRIEVED,
      metadata
    };
  },
  detailError: (error) => {
    return {
      type: types.DETAIL_ERROR,
      error
    }
  }
}

const defaultState = {
  podcast: null,
  requesting: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.DETAIL_REQUESTED:
      return {
        ...state,
        requesting: true
      };
    case types.DETAIL_RETRIEVED:
      return {
        ...state,
        requesting: false,
        podcast: action.metadata
      };
    case types.DETAIL_ERROR:
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
