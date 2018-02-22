import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'INBOX_REQUESTED',
  'INBOX_FETCH_REQUESTED',
  'INBOX_FETCH_COMPLETE',
  'INBOX_FETCH_ERROR',
  'INBOX_ERROR'
]);

export const actions = {
  inboxRequested: (username) => {
    return {
      type: types.INBOX_REQUESTED,
      username
    }
  },
  fetchRequested: (subscription) => {
    return {
      type: types.INBOX_FETCH_REQUESTED,
      subscription
    }
  },
  fetchComplete: (podcast, episodes) => {
    return {
      type: types.INBOX_FETCH_COMPLETE,
      podcast,
      episodes
    }
  },
  fetchError: (error) => {
    return {
      type: types.INBOX_FETCH_ERROR,
      error
    }
  },
  inboxError: (error) => {
    return {
      type: types.INBOX_ERROR,
      error
    }
  }
}

const defaultState = {
  requesting: false,
  requestError: null,
  fetching: false,
  episodes: [],
  fetchError: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.INBOX_REQUESTED:
      return {
        ...state,
        requesting: true
      }
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
        episodes: [
          ...state.episodes.filter(x => x.podcast.id !== action.podcast.id),
          ...action.episodes.map(
            ep => {
              return {
                episode: ep,
                podcast: action.podcast
              }
            }
          )
        ]
      }
    case types.INBOX_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        fetchError: action.error
      }
    case types.INBOX_ERROR:
      return {
        ...state,
        requesting: false,
        requestError: action.error
      }
    default:
      return state;
  }
};

export default reducer;
