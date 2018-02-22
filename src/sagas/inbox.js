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

    // subscriptionEpisodes is a nested array of podcasts and we need to
    // return an array of each episode in the form of: { episode: {}, podcast: {} }

    const episodes = subscriptionEpisodes.map((item, index) => {
      return item.map(e => {
        return {
          podcast: subscriptionArray[index],
          episode: e
        }
      });
    });

    yield put(actions.fetchComplete([].concat(...episodes)))
  }  catch(e) {
    yield put(actions.fetchError(e))
  }
}
