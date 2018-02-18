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
    try {
      return getFile(key, { decrypt: true }).then((data) => {
        return JSON.parse(data);
      });
    } catch(e) {
      return Promise.reject(e);
    }
  },
  removeItem: (key) => {
    try {
      return deleteFile(key);
    } catch(e) {
      return Promise.reject(e);
    }
  },
};


export default BlockstackStorage;
