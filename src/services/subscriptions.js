import { getFile, putFile } from 'blockstack';
import { subscribe as registerSubscription } from './dotpodcast';
import Guid from 'guid';
import axios from 'axios';

const FILENAME = 'subscriptions.json';

const getSubscriptionList = (username) => {
  return getFile(
    FILENAME,
    {
      decrypt: true
    }
  ).then(
    buffer => {
      return JSON.parse(buffer)
    }
  )
}

const getSubscription = (username, options) => {
  return getSubscriptionList().then(
    buffer => {
      const subscriptions = buffer.filter(
        (subscription) => {
          let found = false;

          Object.keys(options).forEach(
            (key) => {
              const value = subscription[key];
              const check = options[key];

              if(value === check) {
                found = true;
              }
            }
          )

          return found;
        }
      )

      if(subscriptions.length) {
        return subscriptions[0];
      }
    }
  )
}

const addSubscription = (username, feedURL) => {
  return axios.get(feedURL).then(
    (podcast) => {
      const subscription = {
        ...podcast.data,
        played_episodes: [],
        id: Guid.create()
      }

      const put = (existingSubscriptions, subscriptionResult) => {
        const subscriptions = [
          ...existingSubscriptions,
          {...subscription, ...subscriptionResult}
        ]

        return putFile(
          FILENAME,
          JSON.stringify(subscriptions),
          {
            encrypt: true
          }
        ).then(
          () => podcast.data
        )
      }

      const post = (subscriptionResult) => {
        const subscriptions = [
          {...subscription, ...subscriptionResult}
        ]

        return putFile(
          FILENAME,
          JSON.stringify(subscriptions),
          {
            encrypt: true
          }
        ).then(
          () => podcast.data
        )
      }

      return registerSubscription(
        podcast.data.subscription_url
      ).then(
        sub => getSubscriptionList().then(
          buffer => put(buffer, sub)
        ).catch(
          () => post(sub)
        )
      )
    }
  )
}

const removeSubscription = (username, id) => {
  return getSubscriptionList().then(
    buffer => {
      const subscriptions = buffer.filter(
        subscription => subscription.id !== id
      )

      return putFile(
        FILENAME,
        JSON.stringify(subscriptions),
        {
          encrypt: true
        }
      ).then(
        () => true
      )
    }
  )
}

export {
  getSubscriptionList,
  getSubscription,
  addSubscription,
  removeSubscription
}
