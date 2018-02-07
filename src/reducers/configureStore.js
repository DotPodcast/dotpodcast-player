import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { persistReducer, persistStore } from 'redux-persist';
import BlockstackStorage from '../services/blockstack-redux-persist';

const persistConfig = {
  key: 'root',
  whitelist: ['search'],
  storage: BlockstackStorage,
};


const configureStore = (history, rootReducer, rootSaga) => {
  const routerMiddleware = createRouterMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store = createStore(
    persistedReducer,
    applyMiddleware(routerMiddleware),
    applyMiddleware(sagaMiddleware)
  );
  const startPersistor = () => persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, startPersistor };
}

export default configureStore;
