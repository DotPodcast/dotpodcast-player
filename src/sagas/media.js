import { put, call } from 'redux-saga/effects';
import { getMediaUrl as getMediaUrlFromFeed } from '../services/dotpodcast';
import { actions } from '../reducers/media';

export function* getMediaUrl(action) {
  try {
    const result = yield call(getMediaUrlFromFeed, action.podcast, action.episode);
    yield put(actions.mediaRetrieved(result));
  } catch(e) {
    yield put(actions.contentError(e));
  }
}
