import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import playerReducer from './player';

const dotpodcastPlayer = combineReducers({
  player: playerReducer,
  router: routerReducer
});

export default dotpodcastPlayer;
