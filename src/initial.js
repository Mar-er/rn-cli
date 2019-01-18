import React from 'react';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
// import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { createLogger } from 'redux-logger';
import { dva } from './utils';
import Router, { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';

// const storage = createSensitiveStorage({
//   keychainService: 'myKeychain',
//   sharedPreferencesName: 'mySharedPrefs',
// });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store);
  return { ...store, persist };
};

const onAction = [routerMiddleware];
if (__DEV__) {
  onAction.push(createLogger());
}

const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction,
  onError(e) {
    console.log('onError', e);
  },
  extraEnhancers: [persistEnhancer()],
});

const App = app.start(<Router />);
persistStore(app._store)   // eslint-disable-line

export default App;
