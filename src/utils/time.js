import moment from 'moment';

export const toReadableTime = (ms) => {
  return moment.utc(ms * 1000).format('HH:mm:ss');
};

export default {
  toReadableTime,
};
