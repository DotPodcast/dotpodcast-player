import { call, takeLatest, takeEvery } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { types as podcastDetailTypes } from '../reducers/podcast-detail';
import { types as mediaTypes } from '../reducers/media';
import { types as startupTypes } from '../reducers/startup';
import { types as subscriptionListTypes } from '../reducers/subscription-list';
import { types as subscriptionDetailTypes } from '../reducers/subscription-detail';
import { types as inboxTypes } from '../reducers/inbox';
import { types as podtoTypes } from '../reducers/podto';
import { types as episodeListTypes } from '../reducers/episode-list';
import { getEpisodes, getPodcasts } from './search';
import { getPodcastDetails } from './podcast-detail';
import { getEpisodeList, getEpisodeListFromPodTo } from './episode-list';
import { getSubscriptionList, addSubscription, removeSubscription } from './subscription-list';
import { getSubscriptionByID, getSubscriptionByURL } from './subscription-detail';
import { getMediaUrl, playMedia, savePlaying } from './media';
import { prepareFetchQueue, fetchEpisodes } from './inbox';
import { types as userTypes } from '../reducers/user';
import { handleLoginCallback, getUserData } from './login';
import { getPodcastDetails as getPodcastDetailsFromWeb } from './podto';

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
    takeLatest(episodeListTypes.EPISODES_REQUESTED, getEpisodeList),
    takeLatest(episodeListTypes.MORE_EPISODES_REQUESTED, getEpisodeList),
    takeLatest(subscriptionDetailTypes.SUBSCRIPTION_REQUESTED_BY_URL, getSubscriptionByURL),
    takeLatest(userTypes.USER_DETAILS_LOADED, getSubscriptionList),
    takeLatest(subscriptionListTypes.SUBSCRIPTIONS_ADD_REQUESTED, addSubscription),
    takeLatest(subscriptionListTypes.SUBSCRIPTIONS_REMOVE_REQUESTED, removeSubscription),
    takeLatest(subscriptionDetailTypes.SUBSCRIPTION_REQUESTED_BY_ID, getSubscriptionByID),
    takeLatest(mediaTypes.MEDIA_REQUESTED, getMediaUrl),
    takeLatest(mediaTypes.MEDIA_RETRIEVED, playMedia),
    takeLatest(mediaTypes.MEDIA_PLAYING, savePlaying),
    takeLatest(inboxTypes.INBOX_FETCH_REQUESTED, fetchEpisodes),
    takeLatest(podtoTypes.PODTO_PODCAST_REQUESTED, getPodcastDetailsFromWeb),
    takeLatest(podtoTypes.PODTO_PODCAST_RETRIEVED, getEpisodeListFromPodTo),
    takeLatest('*', logger)
  ];
};
