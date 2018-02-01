import { put, call } from 'redux-saga/effects';
import { getMediaUrl as getMediaUrlFromFeed } from '../services/dotpodcast';
import { actions } from '../reducers/media';

export function* getMediaUrl(action) {
  try {
    const results = yield call(getMediaUrlFromFeed, action.endpoint, action.itemID);
    yield put(actions.contentRetrieved(results));
  } catch(e) {
    yield put(actions.contentError(e));
  }
}
