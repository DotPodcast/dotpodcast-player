import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootSaga from './sagas';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import AppRoutes from './routes';
import globalStyles from './utils/globalStyles';
import Layout from './containers/Layout';
import configureStore from './reducers/configureStore';

const styles = globalStyles.StyleSheet.create({
  globals: { '*body': {
      margin: 0,
      fontFamily: 'sans-serif',
      backgroundColor: '#262D30',
      color: '#ddd',
    }
  }
});
globalStyles.css(styles.globals);


const history = createHistory();
let { store, persistor } = configureStore(history, rootReducer, rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes history={history} persistor={persistor}/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
