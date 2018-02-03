import { call, takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { types as episodeListTypes } from '../reducers/episode-list';
import { types as startupTypes } from '../reducers/startup';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';
import { getEpisodeList } from './episode-list';

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
    takeLatest(episodeListTypes.LIST_REQUESTED, getEpisodeList),
    takeLatest('*', logger)
  ];
};
