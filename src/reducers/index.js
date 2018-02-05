import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playerReducer from './player';
import searchReducer from './search';
import podcastDetailReducer from './podcast-detail';
import episodeListReducer from './episode-list';
import userReducer from './user';

const dotpodcastPlayer = combineReducers({
  player: playerReducer,
  router: routerReducer,
  search: searchReducer,
  user: userReducer,
  podcastDetail: podcastDetailReducer,
  episodeList: episodeListReducer
});

export default dotpodcastPlayer;
