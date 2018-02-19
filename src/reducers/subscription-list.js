import makeTypes from '../utils/makeTypes'

export const types = makeTypes([
  'SUBSCRIPTIONS_REQUESTED',
  'SUBSCRIPTIONS_RETRIEVED',
  'SUBSCRIPTIONS_ERROR',
  'SUBSCRIPTIONS_ADD_REQUESTED',
  'SUBSCRIPTIONS_ADD_COMPLETE',
  'SUBSCRIPTIONS_ADD_ERROR',
  'SUBSCRIPTIONS_REMOVE_REQUESTED',
  'SUBSCRIPTIONS_REMOVE_COMPLETE',
  'SUBSCRIPTIONS_REMOVE_ERROR'
]);

export const actions = {
  listRequested: (username) => {
    return {
      type: types.SUBSCRIPTIONS_REQUESTED,
      username
    }
  },
  listRetrieved: (results) => {
    return {
      type: types.SUBSCRIPTIONS_RETRIEVED,
      results
    };
  },
  listError: (error) => {
    return {
      type: types.SUBSCRIPTIONS_ERROR,
      error
    }
  },
  addRequested: (username, userPublicKey, feedURL) => {
    return {
      type: types.SUBSCRIPTIONS_ADD_REQUESTED,
      username,
      userPublicKey,
      feedURL
    }
  },
  addComplete: (feedURL, result) => {
    return {
      type: types.SUBSCRIPTIONS_ADD_COMPLETE,
      feedURL,
      result
    };
  },
  addError: (feedURL, error) => {
    return {
      type: types.SUBSCRIPTIONS_ADD_ERROR,
      feedURL,
      error
    }
  },
  removeRequested: (username, id) => {
    return {
      type: types.SUBSCRIPTIONS_REMOVE_REQUESTED,
      username,
      id
    }
  },
  removeComplete: (id, result) => {
    return {
      type: types.SUBSCRIPTIONS_REMOVE_COMPLETE,
      id,
      result
    };
  },
  removeError: (id, error) => {
    return {
      type: types.SUBSCRIPTIONS_REMOVE_ERROR,
      id,
      error
    }
  }
}

const defaultState = {
  podcasts: null,
  requesting: false,
  complete: false,
  error: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SUBSCRIPTIONS_REQUESTED:
      return {
        ...state,
        requesting: true,
        complete: false
      };
    case types.SUBSCRIPTIONS_RETRIEVED:
      return {
        ...state,
        requesting: false,
        podcasts: action.results
      };
    case types.SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    case types.SUBSCRIPTIONS_ADD_REQUESTED:
      return {
        ...state,
        requesting: true,
        complete: false,
        feedURL: action.feedURL
      };
    case types.SUBSCRIPTIONS_ADD_COMPLETE:
      return {
        ...state,
        requesting: false,
        feedURL: action.feedURL,
        complete: true
      };
    case types.SUBSCRIPTIONS_ADD_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
        feedURL: action.feedURL
      }
    case types.SUBSCRIPTIONS_REMOVE_REQUESTED:
      return {
        ...state,
        requesting: true,
        complete: false,
        id: action.id
      };
    case types.SUBSCRIPTIONS_REMOVE_COMPLETE:
      return {
        ...state,
        requesting: false,
        id: action.id,
        complete: true
      };
    case types.SUBSCRIPTIONS_REMOVE_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
        id: action.id
      }
    default:
      return state;
  }
};

export default reducer;
