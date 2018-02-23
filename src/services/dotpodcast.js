import axios from 'axios';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { findSubscription } from './subscriptions';

const APP_URL = 'https://yetunpublished.dotpodcast.co'
const APP_NAME = 'dotpodcast_alpha'
const APP_LOGO = 'https://player.dotpodcast.org/img/logo.svg'

const getMetadata = url => {
  return axios.get(url).then(
    response => response.data
  );
}

const getEpisodeList = url => {
  return axios.get(url).then(
    response => response.data
  );
}

const subscribe = (username, userPublicKey, endpoint, preview = false) => {
  if(preview) {
    return axios.post(
      endpoint,
      {
        app_name: APP_NAME,
        app_url: APP_URL,
        app_logo: APP_LOGO,
        token_kind: 'preview',
        activity: 'listen'
      }
    ).then(response => response.data)
  }

  return axios.post(
    endpoint,
    {
      app_name: APP_NAME,
      app_logo: APP_LOGO,
      token_kind: 'download',
      activity: 'subscribe',
      subscriber_hash: md5(userPublicKey)
    }
  ).then(response => response.data)
}

const getMediaUrl = (username, userPublicKey, podcast, episode) => {
  const makeToken = (subscriberToken, subscriberSecret) => {
    const now = new Date().getTime();
    const ex = /https?:\/\/([^\/]+)/;
    const host = podcast.meta_url.match(ex);

    return jwt.sign(
      {
          iss: APP_URL,
          iat: now,
          exp: now + 60000,
          aud: host[1],
          sub: subscriberToken,
          content_id: episode.id
      },
      subscriberSecret
    )
  }

  const download = (subscriberToken, subscriberSecret) => {
    return axios.get(
      episode.content_audio.url,
      {
        params: {
          jwt: makeToken(subscriberToken, subscriberSecret),
          sub: subscriberToken
        }
      }
    ).then(response => response.data)
  }

  return findSubscription(username, {meta_url: podcast.meta_url}).then(
    (subscription) => {
      if(subscription) {
        return download(
          subscription.subscriber_token,
          subscription.subscriber_secret
        )
      }

      return subscribe(username, userPublicKey, podcast.subscription_url, true).then(
        subscription => download(
          subscription.preview_token,
          subscription.preview_secret
        )
      )
    }
  )
}

const getEpisodes = (username, subscription) => {
  return findSubscription(username, {id: subscription.id}).then(
    sub => {
      const playedEpisodes = sub.played_episodes || []

      return axios.get(sub.items_url).then(
        response => {
          return response.data.items.filter(
            episode => {
              const played = playedEpisodes.find(
                ep => ep.id === episode.id
              )

              if(played) {
                return false
              }

              return true
            }
          )
        }
      )
    }
  )
}

export {
  getMetadata,
  getEpisodeList,
  subscribe,
  getMediaUrl,
  getEpisodes
};
