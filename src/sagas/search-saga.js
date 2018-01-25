import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../reducers/search';
import { searchEpisodes } from '../services/search';

export function* getEpisodes(action) {
  try {
    const results = yield call(searchEpisodes, action.text);
    yield put(actions.searchSuccess(results.hits));
  } catch (e) {
    yield put(actions.searchFail(e));
  }
}
