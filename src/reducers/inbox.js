import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'INBOX_FETCH_REQUESTED',
  'INBOX_FETCH_COMPLETE',
  'INBOX_FETCH_ERROR'
]);

export const actions = {
  fetchRequested: (userPublicKey) => {
    return {
      type: types.INBOX_FETCH_REQUESTED,
      userPublicKey
    }
  },
  fetchComplete: (episodes) => {
    return {
      type: types.INBOX_FETCH_COMPLETE,
      episodes
    }
  },
  fetchError: (error) => {
    return {
      type: types.INBOX_FETCH_ERROR,
      error
    }
  }
}

const defaultState = {
  fetching: false,
  episodes: [],
  fetchError: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.INBOX_FETCH_REQUESTED:
      return {
        ...state,
        requesting: false,
        fetching: true
      }
    case types.INBOX_FETCH_COMPLETE:
      return {
        ...state,
        fetching: false,
        episodes: action.episodes
      }
    case types.INBOX_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        fetchError: action.error
      }
    default:
      return state;
  }
};

export default reducer;
