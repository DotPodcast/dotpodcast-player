import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playerReducer from './player';
import searchReducer from './search';
import podcastDetailReducer from './podcast-detail';
import episodeListReducer from './episode-list';
import subscriptionListReducer from './subscription-list';
import subscriptionDetailReducer from './subscription-detail';
import userReducer from './user';
import inboxReducer from './inbox';
import podtoReducer from './podto';
import behaviorsReducer from './behaviors';

const rootReducer = combineReducers({
  player: playerReducer,
  router: routerReducer,
  search: searchReducer,
  user: userReducer,
  podcastDetail: podcastDetailReducer,
  episodeList: episodeListReducer,
  subscriptionList: subscriptionListReducer,
  subscriptionDetail: subscriptionDetailReducer,
  inbox: inboxReducer,
  podto: podtoReducer,
  behaviors: behaviorsReducer,
});

export default rootReducer;
