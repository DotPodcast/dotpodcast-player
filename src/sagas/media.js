import { put, call } from 'redux-saga/effects';
import { getMediaUrl as getMediaUrlFromFeed } from '../services/dotpodcast';
import { savePlay as savePlayingInStorage } from '../services/subscriptions';
import { actions as mediaActions } from '../reducers/media';
import { actions as playerActions } from '../reducers/player';

export function* getMediaUrl(action) {
  try {
    const result = yield call(getMediaUrlFromFeed, action.username, action.userPublicKey, action.podcast, action.episode);
    yield put(
      mediaActions.mediaRetrieved(
        action.username,
        result,
        action.podcast,
        action.episode
      )
    )
  } catch(e) {
    yield put(mediaActions.mediaError(e));
  }
}

export function* playMedia(action) {
  yield put(playerActions.playUrl(action.content.url));

  yield put(
    mediaActions.mediaPlaying(
      action.username,
      action.content,
      action.podcast,
      action.episode
    )
  )
}

export function* savePlaying(action) {
  const result = yield call(savePlayingInStorage, action.username, action.podcast, action.episode);
}
