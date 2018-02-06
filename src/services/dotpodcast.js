import axios from 'axios';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { getSubscription } from './subscriptions';

const APP_URL = 'https://yetunpublished.dotpodcast.co'

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

const subscribe = (username, endpoint, preview = false) => {
  return axios.post(
    endpoint,
    {
      app_name: 'dotpodcast_alpha',
      app_url: APP_URL,
      token_kind: preview ? 'preview' : 'download',
      activity: preview ? 'listen' : 'subscribe',
      subscriber_hash: md5(username),
      app_logo: 'https://player.dotpodcast.org/img/logo.svg'
    }
  ).then(response => response.data)
}

const getMediaUrl = (username, podcast, episode) => {
  const makeToken = (subscriberHash, subscriberSecret) => {
    const now = new Date().getTime();

    return jwt.sign(
      {
          iss: 'dotpodcast_alpha',
          iat: now,
          exp: now + 60000,
          aud: 'ph.dotpodcast.co',
          sub: subscriberHash,
          content_id: episode.id
      },
      subscriberSecret
    )
  }

  const download = (subscriberHash, subscriberSecret) => {
    return axios.get(
      episode.content_audio.url,
      {
        params: {
          jwt: makeToken(subscriberHash, subscriberSecret),
          kind: 'dl',
          sub: subscriberHash
        }
      }
    ).then(response => response.data)
  }

  const preview = (secret) => {
    return axios.get(
      episode.content_audio.url,
      {
        params: {
          jwt: makeToken(APP_URL, secret),
          kind: 'prv',
          sub: APP_URL
        }
      }
    ).then(response => response.data)
  }

  return getSubscription(username, {meta_url: podcast.meta_url}).then(
    (subscription) => {
      if(subscription) {
        return download(
          subscription.subscriber_hash,
          subscription.subscriber_secret
        )
      }

      return subscribe(username, podcast.subscription_url, true).then(
        subscription => preview(subscription.preview_secret)
      )
    }
  )
}

export { getMetadata, getEpisodeList, subscribe, getMediaUrl };
