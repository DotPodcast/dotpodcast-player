import { getFile, putFile, deleteFile } from 'blockstack';

const BlockstackStorage = {
  setItem: (key, value) => {
    try {
      const str = JSON.stringify(value);
      return putFile(key, str, { encrypt: true });
    } catch(e) {
      return Promise.reject(e);
    }
  },
  getItem: (key) => {
    return getFile(key, { decrypt: true }).then((data) => {
      return JSON.parse(data);
    });
  },
  removeItem: (key) => {
    return deleteFile(key);
  },
};


export default BlockstackStorage;
