import { call, put } from 'redux-saga/effects';
import { actions } from '../reducers/search';
import { searchEpisodes, searchPodcasts } from '../services/search';

export function* getEpisodes(action) {
  try {
    const results = yield call(searchEpisodes, action.text);
    yield put(actions.episodeSuccess(results.hits));
  } catch (e) {
    yield put(actions.episodeFail(e));
  }
}

export function* getPodcasts(action) {
  try {
    const results = yield call(searchPodcasts, action.text);
    yield put(actions.podcastSuccess(results.hits));
  } catch (e) {
    yield put(actions.podcastFail(e));
  }
}
