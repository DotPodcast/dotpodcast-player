import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'PODCAST_REQUESTED',
  'PODCAST_RETRIEVED',
  'PODCAST_ERROR',
  'PODCAST_CLOSED',
]);

export const actions = {
  detailRequested: (slug) => {
    return {
      type: types.PODCAST_REQUESTED,
      slug
    };
  },
  detailRetrieved: (metadata) => {
    return {
      type: types.PODCAST_RETRIEVED,
      metadata
    };
  },
  detailError: (error) => {
    return {
      type: types.PODCAST_ERROR,
      error
    };
  },
  detailClosed: () => {
    return {
      type: types.PODCAST_CLOSED,
    };
  },
}

const defaultState = {
  podcast: null,
  requesting: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.PODCAST_REQUESTED:
      return {
        ...defaultState,
        requesting: true
      };
    case types.PODCAST_RETRIEVED:
      return {
        ...state,
        requesting: false,
        podcast: action.metadata
      };
    case types.PODCAST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    case types.PODCAST_CLOSED:
      return {
        ...defaultState
      }
    default:
      return state;
  }
};

export default reducer;
