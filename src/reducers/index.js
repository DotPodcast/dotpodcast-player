import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playerReducer from './player';
import searchReducer from './search';
import podcastDetailReducer from './podcast-detail';

const dotpodcastPlayer = combineReducers({
  player: playerReducer,
  router: routerReducer,
  search: searchReducer,
  podcastDetail: podcastDetailReducer
});

export default dotpodcastPlayer;
