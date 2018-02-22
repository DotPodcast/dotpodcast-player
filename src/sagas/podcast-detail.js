import { put, call } from 'redux-saga/effects';
import { getPodcastDetails as getPodcastDetailsFromEs } from '../services/search';
import { getMetadata } from '../services/dotpodcast';
import { actions } from '../reducers/podcast-detail';
import { actions as episodeActions } from '../reducers/episode-list';

export function* getPodcastDetails(action) {
  try {
    let result = yield call(getPodcastDetailsFromEs, action.slug);

    if(!result.hits.hits.length) {
      throw new Error('No podcasts found.')
    }

    result = yield call(getMetadata, result.hits.hits[0]._source.meta_url);

    yield put(actions.detailRetrieved(result));
    yield put(episodeActions.listRequested(result.items_url));
  } catch(e) {
    yield put(actions.detailError(e));
  }
}
