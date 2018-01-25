import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playerReducer from './player';
import searchReducer from './search';

const dotpodcastPlayer = combineReducers({
  player: playerReducer,
  router: routerReducer,
  search: searchReducer,
});

export default dotpodcastPlayer;
