import { put, call } from 'redux-saga/effects';
import { findSubscription as getSubscriptionInList } from '../services/subscriptions';
import { actions } from '../reducers/subscription-detail';

export function* getSubscriptionByID(action) {
  try {
    let result = yield call(getSubscriptionInList, action.username, {id: action.id});

    yield put(actions.detailRetrieved(result));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}

export function* getSubscriptionByURL(action) {
  try {
    let result = yield call(getSubscriptionInList, action.username, {meta_url: action.url});

    yield put(actions.detailRetrieved(result));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}

export function* getSubscriptionByPodcast(action) {
  try {
    let result = yield call(getSubscriptionInList, action.username, {meta_url: action.metadata.meta_url});

    yield put(actions.detailRetrieved(result));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}
