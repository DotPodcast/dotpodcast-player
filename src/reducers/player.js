import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'PLAY_URL',
  'SET_PLAYING',
  'UPDATE_PROGRESS',
]);

export const actions = {
  playUrl: (url, title, episode, image_url) => {
    return {
      type: types.PLAY_URL,
      url,
      title,
      episode,
      image_url
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
    episode: '',
    image_url: '',
  },
};

const player = (state = defaultState, action) => {
  switch (action.type) {
    case types.PLAY_URL:
      return {
        ...state,
        url: action.url,
        trackMetadata: {
          title: action.title,
          episode: action.episode,
          image_url: action.image_url
        },
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
