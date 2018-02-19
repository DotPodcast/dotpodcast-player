import axios from 'axios';

const BASE_URL = 'https://min-api.cryptocompare.com/data/price'

const getRates = (symbols, base = 'USD') => {
  return axios.get(BASE_URL, {
    params: {
      fsym: base,
      tsyms: symbols.join(','),
    },
  }).then((response) => response.data);
};

export default {
  getRates,
};
