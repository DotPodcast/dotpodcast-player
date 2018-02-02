import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playerReducer from './player';
import searchReducer from './search';
import userReducer from './user';

const dotpodcastPlayer = combineReducers({
  player: playerReducer,
  router: routerReducer,
  search: searchReducer,
  user: userReducer,
});

export default dotpodcastPlayer;
