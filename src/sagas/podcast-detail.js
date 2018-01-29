import { put, call } from 'redux-saga/effects';
import { getPodcastDetails as getPodcastDetailsFromEs } from '../services/search';
import { actions } from '../reducers/podcast-detail';

export function* getPodcastDetails(action) {
  try {
    const result = yield call(getPodcastDetailsFromEs, action.slug);
    yield put(actions.detailRetrieved(result));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}

