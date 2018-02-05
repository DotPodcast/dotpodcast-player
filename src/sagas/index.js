import { call, takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { types as mediaTypes } from '../reducers/media';
import { types as startupTypes } from '../reducers/startup';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';
import { getEpisodeList } from './episode-list';
import { getSubscriptionList } from './subscription-list';
import { getMediaUrl, playMedia } from './media';

import { types as userTypes } from '../reducers/user';
import { handleLoginCallback, getUserData } from './login';

function* logger(action) {
  yield call(console.log, action);
}
export default function* root() {
  yield [
    takeLatest(startupTypes.STARTUP, getUserData),
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
    takeLatest(searchTypes.SEARCH_REQUESTED, getPodcasts),
    takeLatest(userTypes.USER_LOGIN_CALLBACK, handleLoginCallback),
    takeLatest(podcastDetailTypes.DETAIL_REQUESTED, getPodcastDetails),
    takeLatest(podcastDetailTypes.DETAIL_RETRIEVED, getEpisodeList),
    takeLatest(userTypes.USER_DETAILS_LOADED, getSubscriptionList),
    takeLatest(mediaTypes.MEDIA_REQUESTED, getMediaUrl),
    takeLatest(mediaTypes.MEDIA_RETRIEVED, playMedia),
    takeLatest('*', logger)
  ];
};
