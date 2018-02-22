import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'PLAY_URL',
  'SET_PLAYING',
  'UPDATE_PROGRESS',
  'SHOW_EPISODE',
  'HIDE_EPISODE'
]);

export const actions = {
  playUrl: (url, title, episode, image_url, description) => {
    return {
      type: types.PLAY_URL,
      url,
      title,
      episode,
      image_url,
      description
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
  showDetail: () => {
    return {
      type: types.SHOW_EPISODE
    }
  },
  hideDetail: () => {
    return {
      type: types.HIDE_EPISODE
    }
  }
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
    description: ''
  },
  detailsVisible: false
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
          image_url: action.image_url,
          description: action.description
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
    case types.SHOW_EPISODE:
      return {
        ...state,
        detailsVisible: true
      }
    case types.HIDE_EPISODE:
      return {
        ...state,
        detailsVisible: false
      }
    default:
      return state;
  }
};

export default player;
