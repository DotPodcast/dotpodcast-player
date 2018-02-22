import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'PODTO_PODCAST_REQUESTED',
  'PODTO_PODCAST_RETRIEVED',
  'PODTO_PODCAST_ERROR',
  'PODTO_PODCAST_CLOSED',
]);

export const actions = {
  podcastRequested: (url, feedType) => {
    return {
      type: types.PODTO_PODCAST_REQUESTED,
      url,
      feedType
    };
  },
  podcastRetrieved: (metadata) => {
    return {
      type: types.PODTO_PODCAST_RETRIEVED,
      metadata
    };
  },
  podcastError: (error) => {
    return {
      type: types.PODTO_PODCAST_ERROR,
      error
    };
  },
  podcastClosed: () => {
    return {
      type: types.PODTO_PODCAST_CLOSED,
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
    case types.PODTO_PODCAST_REQUESTED:
      return {
        ...defaultState,
        requesting: true
      };
    case types.PODTO_PODCAST_RETRIEVED:
      return {
        ...state,
        requesting: false,
        podcast: action.metadata
      };
    case types.PODTO_PODCAST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    case types.PODTO_PODCAST_CLOSED:
      return {
        ...defaultState
      }
    default:
      return state;
  }
};

export default reducer;
