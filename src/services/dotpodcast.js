import axios from 'axios';
import jwt from 'jsonwebtoken';

const getMetadata = url => {
  return axios.get(url).then(
    response => response.data
  ).catch(
    error => {
      throw error;
    }
  );
}

const getEpisodeList = url => {
  return axios.get(url).then(
    response => response.data
  ).catch(
    error => {
      throw error;
    }
  );
}

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

export { getMediaUrl, getMetadata, getEpisodeList };
