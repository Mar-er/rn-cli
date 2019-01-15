import React from 'react';
import { persistStore, persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import dva from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';

const storage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => createStore(persistReducer(persistConfig, reducer), initialState, enhancer);

const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e);
  },
  extraEnhancers: [persistEnhancer()],
});

const App = app.start(<Router />);
persistStore(app._store)   // eslint-disable-line

export default App;
