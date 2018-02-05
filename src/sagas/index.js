import { call, takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { types as mediaTypes } from '../reducers/media';
import { types as startupTypes } from '../reducers/startup';
import { types as subscriptionListTypes } from '../reducers/subscription-list';
import { types as subscriptionDetailTypes } from '../reducers/subscription-detail';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';
import { getEpisodeList } from './episode-list';
import { getSubscriptionList, addSubscription, removeSubscription } from './subscription-list';
import { getSubscriptionByID, getSubscriptionByURL, getSubscriptionByPodcast } from './subscription-detail';
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
    takeLatest(podcastDetailTypes.PODCAST_REQUESTED, getPodcastDetails),
    takeLatest(podcastDetailTypes.PODCAST_RETRIEVED, getEpisodeList),
    takeLatest(podcastDetailTypes.PODCAST_RETRIEVED, getSubscriptionByPodcast),
    takeLatest(userTypes.USER_DETAILS_LOADED, getSubscriptionList),
    takeLatest(subscriptionListTypes.SUBSCRIPTIONS_ADD_REQUESTED, addSubscription),
    takeLatest(subscriptionListTypes.SUBSCRIPTIONS_REMOVE_REQUESTED, removeSubscription),
    takeLatest(subscriptionDetailTypes.SUBSCRIPTION_REQUESTED_BY_ID, getSubscriptionByID),
    takeLatest(mediaTypes.MEDIA_REQUESTED, getMediaUrl),
    takeLatest(mediaTypes.MEDIA_RETRIEVED, playMedia),
    takeLatest('*', logger)
  ];
};
