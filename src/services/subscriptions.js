import { getFile, putFile, deleteFile } from 'blockstack';
import { subscribe as registerSubscription } from './dotpodcast';
import Guid from 'guid';
import axios from 'axios';
import md5 from 'md5';

const INDEX_FILENAME = 'subscription_list.json';
const FILENAME_FORMAT = 'subscription_%.json';

const getSubscriptionList = (username) => {
  // Return the list of subscribed podcasts from the index file.
  // The returned JSON is a dict, keyed by subscription ID, containing
  // enough info to render a simple list of subscribed podcasts

  return getFile(
    INDEX_FILENAME,
    {
      decrypt: true
    }
  ).then(
    buffer => buffer ? JSON.parse(buffer) : []
  )
}

const getSubscription = (username, id) => {
  // Return a specific subscription from the file named with an MD5
  // hash of the subscription ID. The returned JSON is a dict with
  // full details of the podcast

  return getFile(
    FILENAME_FORMAT.replace('%', md5(id)),
    {
      decrypt: true
    }
  ).then(
    buffer => buffer ? JSON.parse(buffer) : {}
  )
}

const saveSubscription = (username, id, feed) => {
  return putFile(
    FILENAME_FORMAT.replace('%', md5(id)),
    JSON.stringify(
      {
        id: id,
        added: new Date().getTime(),
        ...feed,
        updated: new Date().getTime()
      }
    ),
    {
      encrypt: true
    }
  )
}

const addSubscription = (username, url) => {
  // Record a new subscription against a podcast's meta feed URL

  // Start off by getting the most up-to-date metadata for the feed,
  // from the podcast host

  return axios.get(url).then(
    feed => {
      // Get the list of subscriptions, so we can add to the dict
      // in a moment

      return getSubscriptionList(username).then(
        subscriptions => {
          // Check if the podcast is already subscribed
          let found = false

          Object.keys(subscriptions).forEach(
            id => {
              if(found) {
                return
              }

              // Compare the subscription's feed meta URL with the one
              // specified in the feed. If they match, we've found the
              // subscription
              const subscription = subscriptions[id]
              if(subscription.meta_url === feed.data.meta_url) {
                found = id
              }
            }
          )

          if(found) {
            // The user is already subscribed to the podcast. Update the
            // subscription, changing the `updated` date to teh current time
            return getSubscription(username, found).then(
              subscription => {
                let updatedSubscriptions = {...subscriptions}
                updatedSubscriptions[found] = {
                  ...updatedSubscriptions[found],
                  ...feed.data
                }

                return putFile(
                  INDEX_FILENAME,
                  JSON.stringify(updatedSubscriptions),
                  {
                    encrypt: true
                  }
                ).then(
                  () => {
                    // Save the updated subscription to the file named with
                    // the subscription ID
                    return saveSubscription(username, found, feed.data)
                  }
                )
              }
            )
          }

          // The user is not already subscribed

          // Register the subscription with the hosting company
          return registerSubscription(username, feed.data.subscription_url).then(
            response => {
              const id = Guid.create().value // Create a new ID for the subscription

              // The user is not yet subscribed to the podcast. Add the new
              // subscription info to the list of subscribed podcasts
              let updatedSubscriptions = {...subscriptions}
              updatedSubscriptions[id] = { // Create a dict of key info for the podcast
                id: id,
                title: feed.data.title,
                artwork: feed.data.artwork,
                meta_url: feed.data.meta_url,
                items_url: feed.data.items_url,
                added: new Date().getTime()
              }

              // Save this updated list back to the index file
              return putFile(
                INDEX_FILENAME,
                JSON.stringify(updatedSubscriptions),
                {
                  encrypt: true
                }
              ).then(
                () => {
                  // Save the new subscription to a file, using the new
                  // subscription ID to generate a hashed filename
                  return saveSubscription(
                    username,
                    id,
                    {
                      ...feed.data,
                      ...response
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )
}

const findSubscription = (username, options) => {
  // Find a specific subscription by ID, or by feed URL

  if(options.id) {
    // We already have a subscription ID, so retrieve the
    // subscription from the file named with that ID
    return getSubscription(username, options.id)
  }

  if(options.meta_url) {
    // We don't know if we're subscribed to this podcast, so look
    // through the index file to see if a subscription matches the
    // feed's meta URL

    return getSubscriptionList(username).then(
      subscriptions => {
        let found = null

        // Loop through the subscription IDs
        Object.keys(subscriptions).forEach(
          id => {
            if(found) {
              return
            }

            // Compare the subscription's feed meta URL with the one
            // specified in `options`. If they match, we've found the
            // subscription
            const subscription = subscriptions[id]
            if(subscription.meta_url === options.meta_url) {
              found = id
            }
          }
        )

        if(found) {
          // The user is subscribed to this podcast. Return the full
          // details of the subscription
          return getSubscription(username, found)
        }

        // The user is not subscribed to the podcast
        return null
      }
    )
  }
}

const savePlay = (username, podcast, episode) => {
  // Log the play of an episode with the podcast host

  const logSubscribedPlay = (subscription) => {
    if(subscription.played_episodes === undefined) {
      subscription.played_episodes = []
    }

    // Find out if the episode has already been played
    let playedEpisode = subscription.played_episodes.find(
      ep => ep.id === episode.id
    )

    // The episode has already been played. There's nothing to log
    if(playedEpisode) {
      return false
    }

    // The episode hasn't been played. Add the episode to the list of
    // played episodes for this subscription
    subscription.played_episodes.push(
      {
        id: episode.id,
        played: new Date().getTime()
      }
    )

    // Save the updated subscription back to storage
    return saveSubscription(username, subscription.id, subscription)
  }

  // Find out if the user is subscribed to the feed
  return findSubscription(username, {meta_url: podcast.meta_url}).then(
    subscription => {
      if(!subscription) {
        // The user is not subscribed to the feed. Log the preview
        return false
      }

      // The user is subscribed to the feed. Log the play
      return logSubscribedPlay(subscription)
    }
  )
}

const removeSubscription = (username, id) => {
  // Remove the record of this subscription

  const updateIndex = () => {
    return getSubscriptionList(username).then(
      subscriptions => {
        delete subscriptions[id]

        return putFile(
          INDEX_FILENAME,
          JSON.stringify(subscriptions),
          {
            encrypt: true
          }
        )
      }
    )
  }

  // Start by removing the file named with the ID of the subscription
  try {
    return deleteFile(
      FILENAME_FORMAT.replace('%', md5(id)),
    ).then(
      () => updateIndex()
    ).catch(
      () => updateIndex()
    )
  } catch(err) {
    console.warn(err)
    return updateIndex()
  }
}

export {
  getSubscriptionList,
  findSubscription,
  addSubscription,
  savePlay,
  removeSubscription
}
