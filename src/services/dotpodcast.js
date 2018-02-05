import axios from 'axios';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

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

const subscribe = endpoint => {
  console.debug('Subscribing via endpoint', endpoint);
  return axios.post(
    endpoint,
    {
      app_name: 'dotpodcast_alpha',
      app_url: 'https://yetunpublished.dotpodcast.co',
      token_kind: 'download',
      activity: 'listen',
      subscriber_hash: md5(new Date().getTime().toString()),
      app_logo: 'https://player.dotpodcast.org/img/logo.svg'
    }
  ).then(response => response.data)
}

const getMediaUrl = (podcast, episode) => {
  return subscribe(podcast.subscription_url).then(
    response => {
      let now = new Date().getTime();
      let token = jwt.sign(
        {
            iss: 'dotpodcast_alpha',
            iat: now,
            exp: now + 60000,
            aud: 'ph.dotpodcast.co',
            sub: response.subscriber_hash,
            content_id: episode.id
        },
        response.subscriber_secret
      );

      return axios.get(
        episode.content_audio.url,
        {
          params: {
            jwt: token,
            kind: 'dl',
            sub: response.subscriber_hash
          }
        }
      ).then(r => r.data)
    }
  )
}

export { getMetadata, getEpisodeList, subscribe, getMediaUrl };
