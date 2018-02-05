import { put, call } from 'redux-saga/effects';
import { getMediaUrl as getMediaUrlFromFeed } from '../services/dotpodcast';
import { actions as mediaActions } from '../reducers/media';
import { actions as playerActions } from '../reducers/player';

export function* getMediaUrl(action) {
  try {
    const result = yield call(getMediaUrlFromFeed, action.podcast, action.episode);
    yield put(mediaActions.mediaRetrieved(result));
  } catch(e) {
    yield put(mediaActions.contentError(e));
  }
}

export function* playMedia(action) {
  yield put(playerActions.playUrl(action.content.url));
}
