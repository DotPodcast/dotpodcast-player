import { getFile, putFile } from 'blockstack';
import Guid from 'guid';
import axios from 'axios';

const FILENAME = 'subscriptions.json';
let subscriptions = null;

const getSubscriptionList = (username) => {
  if(subscriptions !== null) {
    return new Promise(
      (resolve) => resolve(subscriptions)
    )
  }

  return getFile(
    FILENAME,
    {
      decrypt: true
    }
  ).then(
    buffer => {
      subscriptions = JSON.parse(buffer);
      return subscriptions;
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

      const put = (buffer) => {
        subscriptions = [...JSON.parse(buffer), subscription]

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

      const post = () => {
        subscriptions = [subscription]

        return putFile(
          FILENAME,
          JSON.stringify([subscription]),
          {
            encrypt: true
          }
        ).then(
          () => podcast.data
        )
      }

      return getSubscriptionList().then(
        buffer => post()
      ).catch(
        () => post()
      )
    }
  )
}

const removeSubscription = (username, id) => {
  return getSubscriptionList().then(
    buffer => {
      subscriptions = buffer.filter(
        (subscription) => subscription.id !== id
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
