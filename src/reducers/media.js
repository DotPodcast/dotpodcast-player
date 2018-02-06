import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'MEDIA_REQUESTED',
  'MEDIA_RETRIEVED',
  'MEDIA_ERROR'
]);

export const actions = {
  mediaRequested: (username, podcast, episode) => {
    return {
      type: types.MEDIA_REQUESTED,
      username,
      podcast,
      episode
    }
  },
  mediaRetrieved: (content) => {
    return {
      type: types.MEDIA_RETRIEVED,
      content
    };
  },
  mediaError: (error) => {
    return {
      type: types.MEDIA_ERROR,
      error
    }
  }
}

const defaultState = {
  content: null,
  requesting: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.MEDIA_REQUESTED:
      return {
        ...state,
        requesting: true
      };
    case types.MEDIA_RETRIEVED:
      return {
        ...state,
        requesting: false,
        content: action.content
      };
    case types.MEDIA_ERROR:
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
