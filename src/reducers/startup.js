import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'STARTUP',
]);

export const actions = {
  startup: () => {
    return {
      type: types.STARTUP
    };
  },
};
