import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import dotpodcastPlayer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import AppRoutes from './routes';

import './index.css';

const history = createHistory();
const middleware = routerMiddleware(history);
let store = createStore(dotpodcastPlayer, applyMiddleware(middleware));

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes history={history}/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
