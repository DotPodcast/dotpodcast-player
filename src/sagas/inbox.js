import { put, call } from 'redux-saga/effects';
import { getSubscriptionList as getSubscriptionListInStorage } from '../services/subscriptions';
import { getEpisodes } from '../services/dotpodcast';
import { actions } from '../reducers/inbox';

export function* prepareFetchQueue(action) {
  try {
    const results = yield call(getSubscriptionListInStorage, action.username)
    const fetchedList = []

    for(let id in results) {
      try {
        yield put(actions.fetchRequested(results[id]))
      } catch(e) {
        yield put(actions.inboxError(e))
      }
    }
  } catch(e) {
    yield put(actions.subscriptionListError(e))
  }
}

export function* fetchEpisodes(action) {
  try {
    const results = yield call(getEpisodes, action.username, action.subscription)

    yield put(actions.fetchComplete(action.subscription, results))
  } catch(e) {
    yield put(actions.fetchError(e))
  }
}
