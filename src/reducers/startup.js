import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'STARTUP',
]);

export const actions = {
  startup: () => {
    console.log('starting');
    return {
      type: types.STARTUP
    };
  },
};
