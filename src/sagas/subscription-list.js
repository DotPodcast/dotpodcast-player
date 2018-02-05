import { put, call } from 'redux-saga/effects';
import { getSubscriptionList as getSubscriptionListFromStorage } from '../services/subscriptions';
import { actions } from '../reducers/episode-list';

export function* getSubscriptionList(action) {
  try {
    const results = yield call(getSubscriptionListFromStorage, action.data.username);
    yield put(actions.listRetrieved(results));
  } catch(e) {
    yield put(actions.listError(e));
  }
}
