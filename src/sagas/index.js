import { call, takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { types as episodeListTypes } from '../reducers/episode-list';
import { types as mediaTypes } from '../reducers/media';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';
import { getEpisodeList } from './episode-list';
import { getMediaUrl, playMedia } from './media';

function* logger(action) {
  yield call(console.log, action);
}
export default function* root() {
  yield [
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
    takeLatest(searchTypes.SEARCH_REQUESTED, getPodcasts),
    takeLatest(podcastDetailTypes.DETAIL_REQUESTED, getPodcastDetails),
    takeLatest(podcastDetailTypes.DETAIL_RETRIEVED, getEpisodeList),
    takeLatest(mediaTypes.MEDIA_REQUESTED, getMediaUrl),
    takeLatest(mediaTypes.MEDIA_RETRIEVED, playMedia),
    takeLatest('*', logger)
  ];
};
