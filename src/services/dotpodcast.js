import axios from 'axios';
import jwt from 'jsonwebtoken';

const getMediaUrl = (endpoint, itemID) => {
  return axios.get(endpoint).then(
    response => {
      return response.data;
    }
  ).catch(
    error => {
      throw error;
    }
  );
}

const getEpisodeList = url => {
  return axios.get(url).then(
    response => {
      return response.data;
    }
  ).catch(
    error => {
      throw error;
    }
  );
}

export { getMediaUrl, getEpisodeList };
