import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'PLAY_URL',
  'SET_PLAYING',
  'UPDATE_PROGRESS',
]);

export const actions = {
  playUrl: (url) => {
    return {
      type: types.PLAY_URL,
      url
    }
  },
  setPlaying: (isPlaying) => {
    return {
      type: types.SET_PLAYING,
      isPlaying
    }
  },
  updateProgress: (progress) => {
    return {
      type: types.UPDATE_PROGRESS,
      progress
    }
  },
}

const defaultState = {
  url: null,
  playing: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  trackMetadata: {
    title: '',
    podcast: '',
    image: '',
  },
};

const player = (state = defaultState, action) => {
  switch (action.type) {
    case types.PLAY_URL:
      return {
        ...state,
        url: action.url,
        played: 0,
        loaded: 0,
        playing: true
      };
    case types.SET_PLAYING:
      return {
        ...state,
        playing: action.isPlaying
      }
    case types.UPDATE_PROGRESS:
      return {
        ...state,
        ...action.progress
      }
    default:
      return state;
  }
};

export default player;
