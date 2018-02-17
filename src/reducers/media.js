import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'MEDIA_REQUESTED',
  'MEDIA_RETRIEVED',
  'MEDIA_ERROR',
  'MEDIA_PLAYING',
  'MEDIA_PLAY_SAVE_REQUESTED',
  'MEDIA_PLAY_SAVE_COMPLETE',
  'MEDIA_PLAY_SAVE_ERROR'
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
  mediaRetrieved: (username, content, podcast, episode) => {
    return {
      type: types.MEDIA_RETRIEVED,
      username,
      content,
      podcast,
      episode
    };
  },
  mediaError: (error) => {
    return {
      type: types.MEDIA_ERROR,
      error
    }
  },
  mediaPlaying: (username, content, podcast, episode) => {
    return {
      type: types.MEDIA_PLAYING,
      username,
      content,
      podcast,
      episode
    }
  },
  saveMediaPlay: (username, subscriptionID, episode) => {
    return {
      type: types.MEDIA_PLAY_SAVE_REQUESTED,
      username,
      subscriptionID,
      episode
    }
  },
  saveMediaComplete: (success) => {
    return {
      type: types.MEDIA_PLAY_SAVE_COMPLETE,
      success: success
    }
  },
  saveMediaPlayError: (error) => {
    return {
      type: types.MEDIA_PLAY_SAVE_ERROR,
      error: error
    }
  }
}

const defaultState = {
  content: null,
  requesting: false,
  error: null,
  playing: false,
  saving: false,
  saveSuccess: false,
  saveError: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.MEDIA_REQUESTED:
      return {
        ...state,
        requesting: true
      }
    case types.MEDIA_RETRIEVED:
      return {
        ...state,
        requesting: false,
        content: action.content
      }
    case types.MEDIA_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    case types.MEDIA_PLAYING:
      return {
        ...state,
        playing: true
      }
    case types.MEDIA_PLAY_SAVE_REQUESTED:
      return {
        ...state,
        saving: true
      }
    case types.MEDIA_PLAY_SAVE_COMPLETE:
      return {
        ...state,
        saving: false,
        success: action.success
      }
    case types.MEDIA_PLAY_SAVE_ERROR:
      return {
        ...state,
        saving: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
