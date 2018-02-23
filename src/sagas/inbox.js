import { put, call, all } from 'redux-saga/effects';
import { getSubscriptionList as getSubscriptionListInStorage } from '../services/subscriptions';
import { getEpisodes } from '../services/dotpodcast';
import { actions } from '../reducers/inbox';

export function* fetchEpisodes(action) {
  try {
    const subscriptions = yield call(getSubscriptionListInStorage, action.userPublicKey);
    const subscriptionArray = Object.values(subscriptions);

    const subscriptionEpisodes = yield all(
      subscriptionArray.map(s => call(getEpisodes, action.userPublicKey, s))
    )

    const result = subscriptionEpisodes.map((item, index) => {
      return {
        podcast: subscriptionArray[index],
        episodes: item
      }
    });

    yield put(actions.fetchComplete(result));
  }  catch(e) {
    yield put(actions.fetchError(e))
  }
}
