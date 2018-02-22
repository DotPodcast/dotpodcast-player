import { put, call } from 'redux-saga/effects';
import { getPodcastDetails as getPodcastDetailsFromWeb } from '../services/podto';
import { actions } from '../reducers/podto';

export function* getPodcastDetails(action) {
  try {
    let result = yield call(getPodcastDetailsFromWeb, action.url, action.feedType);

    yield put(actions.podcastRetrieved(result));
  } catch(e) {
    yield put(actions.podcastError(e));
  }
}
