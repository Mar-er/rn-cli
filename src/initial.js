import React from 'react';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { dva } from './utils';
import Router, { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';

// 将store缓存至 asyncStorage 配置
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store);
  return { ...store, persist };
};

// 添加redux日志插件
const onAction = [routerMiddleware];
if (__DEV__) {
  onAction.push(createLogger());
}

const models = [appModel];
const initialState = {};
models.forEach((m) => { initialState[m.namespace] = m.state; });
const undo = r => (state, action) => {
  const newState = r(state, action);
  if (action.type === 'user/logoutOnlyStatus') {
    return {
      routing: newState.routing,
      ...initialState,
    };
  }
  return newState;
};

const app = dva({
  initialState: {},
  models,
  onAction,
  onReducer: undo,
  onError(e) {
    console.log('onError', e);
  },
  extraEnhancers: [persistEnhancer()],
  extraReducers: { router: routerReducer },
});

const App = app.start(<Router />);
persistStore(app._store)   // eslint-disable-line

export default App;
