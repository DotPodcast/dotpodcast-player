import axios from 'axios';

const error = (message, code=5000) => {
  let err = new Error(message)

  err.code = code;
  return err;
}

export const getPodcastDetails = async (url, type='application/xml') => {
  switch(type) {
    case 'application/json+dotpodcast':
      const response = await axios.get(url);

      return response.data;

    default:
      throw error('This type of feed is not supported by the DotPodcast Player.');
  }
}
