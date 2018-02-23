import { put, call } from 'redux-saga/effects';
import { getEpisodeList as getEpisodeListFromFeed } from '../services/dotpodcast';
import { actions } from '../reducers/episode-list';

export function* getEpisodeList(action) {
  try {
    const results = yield call(getEpisodeListFromFeed, action.url);
    yield put(actions.listRetrieved(results));
  } catch(e) {
    yield put(actions.listError(e));
  }
}
