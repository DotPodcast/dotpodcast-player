import { call, takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';

function* logger(action) {
  yield call(console.log, action);
}
export default function* root() {
  yield [
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
    takeLatest(searchTypes.SEARCH_REQUESTED, getPodcasts),
    takeLatest(podcastDetailTypes.DETAIL_REQUESTED, getPodcastDetails),
    takeLatest('*', logger)
  ];
};
