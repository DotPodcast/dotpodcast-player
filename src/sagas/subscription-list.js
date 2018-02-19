import { put, call } from 'redux-saga/effects';
import {
  getSubscriptionList as getSubscriptionListFromStorage,
  addSubscription as addSubscriptionInStorage,
  removeSubscription as removeSubscriptionInStorage
} from '../services/subscriptions';
import { actions } from '../reducers/subscription-list';

export function* getSubscriptionList(action) {
  try {
    const results = yield call(getSubscriptionListFromStorage, action.data.username);
    yield put(actions.listRetrieved(
      Object.values(results)
    ));
  } catch(e) {
    yield put(actions.listError(e));
  }
}

export function* addSubscription(action) {
  try {
    const result = yield call(addSubscriptionInStorage, action.username, action.userPublicKey, action.feedURL);

    yield put(actions.addComplete(action.feedURL, result));
  } catch(e) {
    yield put(actions.addError(action.feedURL, e));
  }
}

export function* removeSubscription(action) {
  try {
    const result = yield call(removeSubscriptionInStorage, action.username, action.id);

    yield put(actions.removeComplete(action.id, result));
  } catch(e) {
    yield put(actions.removeError(action.id, e));
  }
}
