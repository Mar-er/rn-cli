import React from 'react';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { dva, routeUtil } from './utils';
import Router, { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';

// model集合，引入的model都要加入其中
const models = [appModel];

// 添加action触发前插件
const onAction = [routerMiddleware];

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
if (__DEV__) {
  onAction.push(createLogger());
}

global.ROUTERS = [];

// 切换路由时更改statusBar 状态的中间件
const changeStatusBarMiddle = params => () => next => (action) => {
  const { routeName, type } = action;
  // 如果未传参直接中止
  if (!params) {
    return next(action);
  }
  if (type === 'Navigation/NAVIGATE') {
    routeUtil.setStatusBar((params.constructor === Array && params.findIndex(v => v === routeName) !== -1) || routeName === params);
  }

  if (action.type.indexOf('Navigation/NAVIGATE') !== -1) {
    global.ROUTERS.push(action.routeName);
    console.log(47, global.ROUTERS);
  }

  return next(action);
};

onAction.push(changeStatusBarMiddle(routeUtil.statusBarImmersiveRouter));

// 退出登录时重置store
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
