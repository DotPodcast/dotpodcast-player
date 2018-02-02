import { put, call } from 'redux-saga/effects';
import { getPodcastDetails as getPodcastDetailsFromEs } from '../services/search';
import { actions } from '../reducers/podcast-detail';

export function* getPodcastDetails(action) {
  try {
    const result = yield call(getPodcastDetailsFromEs, action.slug);

    if(!result.hits.hits.length) {
      throw new Error('No podcasts found.')
    }

    yield put(actions.detailRetrieved(result));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}
