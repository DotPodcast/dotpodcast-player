import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'PLAY_URL',
  'SET_PLAYING',
  'UPDATE_PROGRESS',
  'SHOW_EPISODE',
  'HIDE_EPISODE',
  'SET_DURATION',
  'SET_MUTE_VALUE',
  'SET_VOLUME',
  'SET_SEEKING',
  'SET_POSITION',
]);

export const actions = {
  playUrl: (url, title, episode, image_url, description, touch) => {
    return {
      type: types.PLAY_URL,
      url,
      title,
      episode,
      image_url,
      description,
      touch
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
  },
  setDuration: (duration) => {
    return {
      type: types.SET_DURATION,
      duration
    }
  },
  setMuteValue: (muted) => {
    return {
      type: types.SET_MUTE_VALUE,
      muted,
    }
  },
  setVolume: (volume) => {
    return {
      type: types.SET_VOLUME,
      volume
    }
  },
  setSeeking: (seeking) => {
    return {
      type: types.SET_SEEKING,
      seeking
    }
  },
  setPosition: (position) => {
    return {
      type: types.SET_POSITION,
      position
    }
  },
};

const defaultState = {
  url: null,
  playing: false,
  volume: 0.8,
  muted: false,
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
  seeking: false,
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
        playedSeconds: 0,
        loaded: 0,
        loadedSeconds: 0,
        playing: !action.touch
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
    case types.SET_DURATION:
      return {
        ...state,
        duration: action.duration
      }
    case types.SET_MUTE_VALUE:
      return {
        ...state,
        muted: action.muted,
      }
    case types.SET_VOLUME:
      return {
        ...state,
        volume: action.volume
      }
    case types.SET_SEEKING:
      return {
        ...state,
        seeking: action.seeking
      }
    case types.SET_POSITION:
      return {
        ...state,
        played: action.position
      }
    default:
      return state;
  }
};

export default player;
