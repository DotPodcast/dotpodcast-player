import axios from 'axios';

const getPreviewToken = (endpoint, itemID) => {
  return axios.get()
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

export { getPreviewToken, getEpisodeList };
