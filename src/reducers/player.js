import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'PLAY_URL',
  'SET_PLAYING',
  'UPDATE_PROGRESS',
  'SET_DURATION',
  'SET_MUTE_VALUE',
  'SET_VOLUME',
  'SET_SEEKING',
  'SET_POSITION',
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
        playedSeconds: 0,
        loaded: 0,
        loadedSeconds: 0,
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
