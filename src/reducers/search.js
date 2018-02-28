import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'SEARCH_REQUESTED',
  'EPISODE_FETCH_SUCCEEDED',
  'EPISODE_FETCH_FAILED',
  'PODCAST_FETCH_SUCCEEDED',
  'PODCAST_FETCH_FAILED',
]);

export const actions = {
  updateQuery: (text) => {
    return {
      type: types.SEARCH_REQUESTED,
      text,
      podcastResults: null,
      episodeResults: null
    };
  },
  episodeSuccess: (results) => {
    return {
      type: types.EPISODE_FETCH_SUCCEEDED,
      results
    };
  },
  episodeFail: (error) => {
    return {
      type: types.EPISODE_FETCH_FAILED,
      error
    };
  },
  podcastSuccess: (results) => {
    return {
      type: types.PODCAST_FETCH_SUCCEEDED,
      results
    };
  },
  podcastFail: (error) => {
    return {
      type: types.PODCAST_FETCH_FAILED,
      error
    };
  }
};

const defaultState = {
  text: '',
  podcastResults: {
    searching: false,
    error: null,
    total: 0,
    hits: []
  },
  episodeResults: {
    searching: false,
    error: null,
    total: 0,
    hits: []
  },
};

const search = (state = defaultState, action) => {
  switch (action.type) {
    case types.SEARCH_REQUESTED:
      return {
        ...state,
        text: action.text,
        podcastResults: {
          searching: true,
          error: null,
          hits: action.text === '' ? [] : state.podcastResults.hits,
          total: action.text === '' ? 0 : state.podcastResults.total,
        },
        episodeResults: {
          ...state.episodeResults,
          searching: true,
          hits: [],
          total: 0
        }
      };
    case types.EPISODE_FETCH_SUCCEEDED:
      return {
        ...state,
        episodeResults: {
          ...state.episodeResults,
          searching: false,
          total: action.results.total,
          hits: action.results.hits
        }
      }
    case types.EPISODE_FETCH_FAILED:
      return {
        ...state,
        episodeResults: {
          ...state.episodeResults,
          searching: false,
          error: action.error,
        }
      }
    case types.PODCAST_FETCH_SUCCEEDED:
      return {
        ...state,
        podcastResults: {
          ...state.podcastResults,
          searching: false,
          total: action.results.total,
          hits: action.results.hits
        }
      }
    case types.PODCAST_FETCH_FAILED:
      return {
        ...state,
        podcastResults: {
          ...state.podcastResults,
          searching: false,
          error: action.error,
        }
      }
    default:
      return state;
  }
};

export default search;
